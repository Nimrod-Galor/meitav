import { useEffect, useState } from 'react';
import ApiServices from './Components/ApiServices';
import PersonForm from './Components/PersonForm';
import PTableRow from './Components/PTableRow';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [error, setError] = useState('');
  const [persons, setPersons] = useState([]);

  const updatePersons = (newPerson) => {
    setPersons([...persons, newPerson]);
  }

  const renderPersons = () => {
    if(persons.length === 0){
      return <div className='row'>
        <div className='col-12'>לא נמצאו תוצאות!</div>
      </div>
    }

    return(
      <>
        <div className='row'>
          <div className='col-4 fs-4 font-weight-bold border-bottom'>שם מלא</div>
          <div className='col-4 fs-4 font-weight-bold border-bottom'>תאריך לידה</div>
          <div className='col-4 fs-4 font-weight-bold border-bottom'>ת.ז</div>
        </div>
        {persons.map(p => {
          return <PTableRow key={p.idNum} {...p} />
        })}
      </>
      )
  };

  useEffect(() => {
    ApiServices.getPersons()
    .then(res => {
      console.log(res.data);
      setPersons(res.data);
    })
    .catch(err => {
        console.log(err);
        setError(err.message);
    });
  }, []);

  return (
    <div className="container">
      <div className="px-4 py-5 my-5 text-center">
        <img className="d-block mx-auto mb-4" src="/meitavlogo_2.jpg" alt="" />
        <h1 className="display-5 fw-bold">Nimrod Galor React Test</h1>
      </div>
      <PersonForm updatePersons={updatePersons} />
      {renderPersons()}
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover />
    </div>
  );
}

export default App;
