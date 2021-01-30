import React, {useState, useEffect} from 'react'

const HisotiraForm = (props) => {
    const initialFieldValues ={
        data_pobrania_sprzetu:'',
        data_zdania_sprzetu:'',
        imie:'',
        nazwisko:'',
        numer_seryjny_komputer:'',
        numer_seryjny_telefon:''
    }

    var [values, setValues] = useState(initialFieldValues)

    useEffect(() => {
        if(props.currentId=='')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.historiaObjects[props.currentId]
            }) 
    }, [props.currentId, props.historiaObjects])

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
            <input class="intext1" placeholder="Data pobrania sprzętu" name="data_pobrania_sprzetu" value={values.data_pobrania_sprzetu} onChange={handleInputChange}/>
            <input class="intext1" placeholder="Data zdania sprzętu" name="data_zdania_sprzetu" value={values.data_zdania_sprzetu} onChange={handleInputChange}/>
            <input class="intext1" placeholder="Imie" name="imie" value={values.imie} onChange={handleInputChange}/>
            <input class="intext1" placeholder="Nazwisko" name="nazwisko" value={values.nazwisko} onChange={handleInputChange}/>
            <input class="intext1" placeholder="Numer seryjny komputer" name="numer_seryjny_komputer" value={values.numer_seryjny_komputer} onChange={handleInputChange}/>
            <input class="intext1" placeholder="Numer seryjny telefon" name="numer_seryjny_telefon" value={values.numer_seryjny_telefon} onChange={handleInputChange}/>
            <input class="intext1" type="submit" class="btn btn-info" value={props.currentId==''?"Dodaj dane":"Aktualizuj"}/>
        </form>
    );
}

export default HisotiraForm;