import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

class EditorIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
        this.onChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }
    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    render() {
        return (
            <Editor
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
            />
        );
    }
}
export default EditorIn;