import { useState } from 'react';
import ApiServices from './ApiServices';
import { toast } from 'react-toastify';

const PersonForm = ({updatePersons}) => {
    const [error, setError] = useState('');
    const [errorFn, setErrorFn] = useState('');
    const [errorBd, setErrorBd] = useState('');
    const [errorId, setErrorId] = useState('');
    const [person, setPerson] = useState({
        fullName:'',
        birthDate:'',
        idNum:''
    });

    const handleChange = (e) => {
        setPerson({...person, [e.target.id]:e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmit');

        if(person.fullName === ''){
            setErrorFn('שדה חובה שם מלא!');
            return;
        }

        if(person.fullName.length > 20){
            setErrorFn('שדה שם מלא ארוך מ20 אותיות!');
            return;
        }

        let reg = /^[a-z \u0590-\u05fe]+$/i;
        if(!reg.test(person.fullName)){
            setErrorFn('יש להשתמש באותיות בלבד בשדה שם מלא!');
            return;
        }

        setErrorFn('');

        if(person.birthDate === ''){
            setErrorBd('שדה חובה תאריך לידה!');
            return;
        }

        setErrorBd('');

        if(person.idNum === ''){
            setErrorId('שדה חובה מספר ת.ז!');
            return;
        }

        if(!IsValidIsraeliID(person.idNum)){
            setErrorId('מספר ת.ז לא תקין!');
            return;
        }

        setErrorId('');

        ApiServices.createPerson(person)
        .then(res => {
            updatePersons(res.data);
            setPerson({fullName:'',birthDate:'',idNum:''});
            toast.success('הרשומה נוספה בהצלחה', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }).catch(err => {
            setError(err.response.data.message);
        })
    };

    const IsValidIsraeliID = (israeliID) =>
    {
        if (israeliID.length != 9){
            return false;
        }

        let sum = 0;

        for (let i = 0; i < israeliID.length; i++)
        {
            let digit = israeliID[israeliID.length - 1 - i] - '0';
            sum += (i % 2 != 0) ? GetDouble(digit) : digit;
        }

        return sum % 10 == 0;

        function GetDouble(i)
        {
            switch (i)
            {
                case 0: return 0;
                case 1: return 2;
                case 2: return 4;
                case 3: return 6;
                case 4: return 8;
                case 5: return 1;
                case 6: return 3;
                case 7: return 5;
                case 8: return 7;
                case 9: return 9;
                default: return 0;
            }
        }
    }




    return(
        <>
        {error && <div className='row'><div className='col-12 fs-4 text-danger mb-3'>{error}</div></div>}
        <div className="row g-3 mb-1">
            <div className="col-md-3">
                {errorFn && <div className='row'><div className='col-12 fs-4 text-danger mb-3'>{errorFn}</div></div>}
            </div>
            <div className="col-md-3">
                {errorBd && <div className='row'><div className='col-12 fs-4 text-danger mb-3'>{errorBd}</div></div>}
            </div>
            <div className="col-md-3">
                {errorId && <div className='row'><div className='col-12 fs-4 text-danger mb-3'>{errorId}</div></div>}
            </div>
            <div className="col-md-3">
                
            </div>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-5">
                <div className="col-md-3">
                    <input type="text" className="form-control" id="fullName" onChange={handleChange} value={person.fullName} placeholder="שם מלא" />
                </div>
                <div className="col-md-3">
                    <input type="date" className="form-control" id="birthDate" onChange={handleChange} value={person.birthDate} placeholder="תאריך לידה" />
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" id="idNum" onChange={handleChange} value={person.idNum} placeholder="מספר ת.ז" />
                </div>
                <div className="col-md-3">
                    <button type="submit" className="btn btn-primary w-100">שלח</button>
                </div>
            </div>
        </form>
        </>
    )
}

export default PersonForm;