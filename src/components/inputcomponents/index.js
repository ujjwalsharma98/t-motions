import React from "react"
import Input from "./input"
import TextArea from "./textArea.js"
import Select from "./select.js"
import RadioButtons from "./radioButtons.js"
import CheckBoxes from "./checkBoxes.js"

function FormikController(props) {
  const { control, ...rest } = props
  switch (control) {
    case "input":
      return <Input {...rest} />
    case "textArea":
      return <TextArea {...rest} />
    case "select":
      return <Select {...rest} />
    case "radio":
      return <RadioButtons {...rest} />
    case "checkbox":
      return <CheckBoxes {...rest} />
    default:
      return null
  }
}
export default FormikController