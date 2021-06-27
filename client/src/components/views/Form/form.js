import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default function App() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [To, setTo] = useState("");
  const [Sub, setSub] = useState("");
  const [Body, setBody]=useState("")
  const [cc, setCc] = useState("")

  const onChange1=(event)=>{
    setTo(event.currentTarget.value)
}
const onChange2=(event)=>{
    setSub(event.currentTarget.value)
}
const onChange3=(event)=>{
  setCc(event.currentTarget.value)
}
const onChange4=(event)=>{
  const contentRaw = convertToRaw(editorState.getCurrentContent());
  const contentHTML = draftToHtml(contentRaw);
  setBody(contentHTML)
}

const onSubmit = (event) => {
  event.preventDefault();

  const mail = {
      rec_email: To,
      subject: Sub,
      cc:cc,
      body:Body
  }

  axios.post('/api/email/sendEmail',mail)
      .then(response =>{
          if(response.data.success){
              alert("Mail sent successfully")
          } else {
              alert("failed to send mail")
          }
      })
}
  useEffect(() => {
    console.log(editorState);
    console.log(Body);
  }, [editorState]);
  return (
    <div style={{"width":"60%", "margin":"auto", paddingTop:"50px"}}>
    <div style={{"margin":"auto","textAlign":"center"}}>
    <h2 style={{"margin":"auto","fontFamily":"sans-serif","backgroundColor":"#1A415C", "color":"white", "fontWeight":"bold","padding":"10px"}}>Send Your Email</h2>
    </div>
    <Form>
      <FormGroup>
        <Label style={{"fontFamily":"serif","fontSize":"1.25rem",paddingTop:"10px"}}>To</Label>
        <Input onChange={onChange1} type="email" name="to" id="to" placeholder="" />
      </FormGroup>
      <FormGroup>
        <Label style={{"fontFamily":"serif","fontSize":"1.25rem",paddingTop:"10px"}} >CC</Label>
        <Input onChange={onChange3} type="email" name="cc" id="cc" placeholder="" />
      </FormGroup>
      <FormGroup>
        <Label style={{"fontFamily":"serif","fontSize":"1.25rem",paddingTop:"10px"}} >Subject</Label>
        <Input onChange={onChange2} type="text" name="sub" id="sub" placeholder="" />
      </FormGroup>
       <FormGroup>
       <Label style={{"fontFamily":"serif","fontSize":"1.25rem", paddingTop:"10px"}} >Write your mail</Label>
       <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onChange={onChange4}
        />
      </div>
       </FormGroup>
      <br />
      <Button color="primary" onClick={onSubmit} type="submit">Send Mail</Button>
    </Form>
    </div>
  );
}

