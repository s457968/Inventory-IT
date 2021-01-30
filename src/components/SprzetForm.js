import React, {useState, useEffect} from 'react'

const SprzetForm = (props) => {
    const initialFieldValues ={
        numer_seryjny:'',
        nazwa_urzadzenia:'',
        rodzaj_urzadzenia:'',
        stan:''
    }

    var [values, setValues] = useState(initialFieldValues)

    useEffect(() => {
        if(props.currentId=='')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.sprzetObjects[props.currentId]
            }) 
    }, [props.currentId, props.sprzetObjects])

    const handleInputChange = e => {
        var {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        props.addOrEdit(values)
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input class="intext" placeholder="Numer seryjny" name="numer_seryjny" value={values.numer_seryjny} onChange={handleInputChange}/>
            <input class="intext" placeholder="Nazwa urządzenia" name="nazwa_urzadzenia" value={values.nazwa_urzadzenia} onChange={handleInputChange}/>
            <input class="intext" placeholder="Rodzaj urządzenia" name="rodzaj_urzadzenia" value={values.rodzaj_urzadzenia} onChange={handleInputChange}/>
            <input class="intext" placeholder="Stan" name="stan" value={values.stan} onChange={handleInputChange}/>
            <input type="submit" class="btn btn-info" value={props.currentId==''?"Dodaj sprzęt":"Aktualizuj"}/>
        </form>
    );
}

export default SprzetForm;