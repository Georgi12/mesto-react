import React from 'react'



function useValidation(inputs) {
    const [validators, setValidators] = React.useState(inputs)


    for(let i in inputs) {
        console.log(inputs[i])
    }

    return inputs

}

export default useValidation


