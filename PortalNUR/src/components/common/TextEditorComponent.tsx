import React, { useEffect } from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

type TextEditorProps = {
    name: string;
    initialValue: string;
    isInitialValueLoaded: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: boolean;
}

const toolbarItems = [
    [{
        name: 'undo',
        text: '←',
        command: 'undo',
        tooltip: 'Undo',
    },
    {
        name: 'redo',
        text: '→',
        command: 'redo',
        tooltip: 'Redo',
    }
    ],
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'indent', 'outdent'],
    ['link'],
];

const TextEditorComponent = ({ name, initialValue, onChange, error, isInitialValueLoaded }: TextEditorProps) => {
    const editorRef = React.createRef<Editor>();

    const handleChange = () => {
        if (!editorRef.current) return;
        onChange({
            target: {
                name,
                value: editorRef.current.getInstance().getMarkdown()
            }
        } as React.ChangeEvent<HTMLInputElement>);
    };

    useEffect(() => {
        if (!editorRef.current) return;
        const rootElement = editorRef.current.getRootElement()
        if (error) {
            rootElement.classList.add('border');
            rootElement.classList.add('border-red-500');
        } else {
            rootElement.classList.remove('border');
            rootElement.classList.remove('bg-red-500');
        }
    }, [error, editorRef]);

    useEffect(() => {
        if (!isInitialValueLoaded) return;
        if (!editorRef.current) return;
        editorRef.current.getInstance().setMarkdown(initialValue);
    }, [isInitialValueLoaded]);

    return (
        <Editor
            initialValue={" "}
            height="300px"
            initialEditType="wysiwyg"
            ref={editorRef}
            useCommandShortcut={true}
            onChange={handleChange}
            hideModeSwitch={true}
            usageStatistics={false}
            toolbarItems={toolbarItems}
        />);
};


export default TextEditorComponent;