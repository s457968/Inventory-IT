import React, {useState, useEffect} from 'react'
import HistoriaForm from './HistoriaForm';
import fire from '../config/fire';

const Historia = () => {
    
    var [historiaObjects, setHistoriaObjects] = useState({})
    var [currentId, setCurrentId] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fire.database().ref().child('Historia').on('value', snapshot => {
            if(snapshot.val() != null)
                setHistoriaObjects({
                    ...snapshot.val()
                })
            else
                setHistoriaObjects({})
        })
    }, [])

    const addOrEdit = obj => {
        if (currentId == '')
            fire.database().ref().child('Historia').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        else
            fire.database().ref().child(`Historia/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
    }

    const onDelete = key => {
        if (window.confirm('Czy na pewno chcesz usunąć ten wiersz z listy?')) {
            fire.database().ref().child(`Historia/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
        <>
        <div class="Sprzet">
        <HistoriaForm {...({addOrEdit, currentId, historiaObjects})}/>
        <input class="szukaj" type="text" placeholder="Szukaj..." onChange={ (event) => {setSearchTerm(event.target.value)}} />
            <table class="table table-hover" id="table-Sprzet">
                <thead>
                    <tr>
                    <th scope="col">Data pobrania sprzętu</th>
                    <th scope="col">Data zdania sprzętu</th>
                    <th scope="col">Imie</th>
                    <th scope="col">Nazwisko</th>
                    <th scope="col">Numer seryjny komputera</th>
                    <th scope="col">Numer seryjny telefon</th>
                    <th scope="col">Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(historiaObjects).filter((id) => {
                            if (searchTerm == "") {
                                return id
                            } else if (historiaObjects[id].data_pobrania_sprzetu.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return id
                            } else if (historiaObjects[id].data_zdania_sprzetu.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return id
                            } else if (historiaObjects[id].imie.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return id
                            } else if (historiaObjects[id].nazwisko.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return id
                            } else if (historiaObjects[id].numer_seryjny_komputer.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return id
                            } else if (historiaObjects[id].numer_seryjny_telefon.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return id
                            }
                        }).map(id => {
                            return <tr key={id} class="table-primary">
                                <th scope="row">{historiaObjects[id].data_pobrania_sprzetu}</th>
                                <td>{historiaObjects[id].data_zdania_sprzetu}</td>
                                <td>{historiaObjects[id].imie}</td>
                                <td>{historiaObjects[id].nazwisko}</td>
                                <td>{historiaObjects[id].numer_seryjny_komputer}</td>
                                <td>{historiaObjects[id].numer_seryjny_telefon}</td>
                                <td>
                                    <a onClick={() => {setCurrentId(id)}}>
                                        <button class="badge badge-light">Edytuj</button>
                                    </a>
                                    <a onClick={() => {onDelete(id)}}>
                                        <button class="badge badge-danger">Usuń</button>
                                    </a>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div> 
        </>
    );
}

export default Historia;