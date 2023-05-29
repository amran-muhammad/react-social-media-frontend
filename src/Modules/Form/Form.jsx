import { useState } from "react"

const Form = () => {
    const [inputs, setInputs] = useState({})

    const handleForm = (e) => {
        let key = e.target.name
        setInputs((prev)=>{
            return {
                ...prev, [key]:e.target.value
            }
        })
    }
    return (
        <div>
            <h1> Form</h1>
            <form onSubmit={(e)=>{
                e.preventDefault()
                console.log("submitted",JSON.stringify(inputs))
            }}>
                <label htmlFor="">
                    Enter your name:
                    <br />
                    <input type="text" name="name" onChange={handleForm} />
                </label>
                <br />
                <label htmlFor="">
                    Gender:
                    <select name="gender" id="" onChange={handleForm}>
                        <option value="male">Male</option>
                        <option value="female">Feale</option>
                    </select>
                </label>
                <br />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Form