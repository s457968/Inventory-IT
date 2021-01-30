import React, {useState, useEffect} from 'react'
import SprzetForm from './SprzetForm';
import fire from '../config/fire';

const Sprzet = () => {
    
    var [sprzetObjects, setSprzetObjects] = useState({})
    var [currentId, setCurrentId] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fire.database().ref().child('Sprzet').on('value', snapshot => {
            if(snapshot.val() != null)
                setSprzetObjects({
                    ...snapshot.val()
                })
            else
                setSprzetObjects({})
        })
    }, [])

    const addOrEdit = obj => {
        if (currentId == '')
            fire.database().ref().child('Sprzet').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        else
            fire.database().ref().child(`Sprzet/${currentId}`).set(
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
        if (window.confirm('Czy na pewno chcesz usunąć ten sprzęt z listy?')) {
            fire.database().ref().child(`Sprzet/${key}`).remove(
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
        <SprzetForm {...({addOrEdit, currentId, sprzetObjects})}/>
        <input class="szukaj" type="text" placeholder="Szukaj..." onChange={ (event) => {setSearchTerm(event.target.value)}} />
            <table class="table table-hover" id="table-Sprzet">
                <thead>
                    <tr>
                    <th scope="col">Numer seryjny</th>
                    <th scope="col">Nazwa urządzenia</th>
                    <th scope="col">Rodzaj urządzenia</th>
                    <th scope="col">Stan</th>
                    <th scope="col">Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(sprzetObjects).filter((id) => {
                            if (searchTerm == "") {
                                return id
                            } else if (sprzetObjects[id].numer_seryjny.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return id
                            } else if (sprzetObjects[id].nazwa_urzadzenia.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return id
                            } else if (sprzetObjects[id].rodzaj_urzadzenia.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return id
                            } else if (sprzetObjects[id].stan.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return id
                            }
                        }).map(id => {
                            return <tr key={id} class="table-primary">
                                <th scope="row">{sprzetObjects[id].numer_seryjny}</th>
                                <td>{sprzetObjects[id].nazwa_urzadzenia}</td>
                                <td>{sprzetObjects[id].rodzaj_urzadzenia}</td>
                                <td>{sprzetObjects[id].stan}</td>
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

export default Sprzet;