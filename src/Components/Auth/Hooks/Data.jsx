import { useState } from "react"

const Data = (initForm = {}) => {
    const[formState, setFormState] = useState(initForm)

    const onHandleChange = (initForm) => {
        localStorage.setItem("user", JSON.stringify(initForm))
    }
    const onSubmit = () => {
        setFormState(initForm)
    }
    return{
        ...setFormState,
        onHandleChange,
        onSubmit
    }
}

export default Data;