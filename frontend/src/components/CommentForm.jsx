import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";
import { Stack } from "@mui/joy";


const CommentForm = ( {
    handleSubmit,
    initialText = ""
}
) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
    <Stack direction="row" spacing={2}>
    <TextField
        onChange={(e) => setText(e.target.value)}
        value={text}
        fullWidth label={"Type comment here"} 
        multiline
        variant="outlined"
        />

    <Button variant="outlined" onClick={onSubmit}>Submit</Button>
    </Stack>
      
    </form>
  );
};

export default CommentForm;