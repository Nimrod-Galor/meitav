const humanDate = (strDate) => {
    let d = new Date(strDate);
    return d.toLocaleDateString();
};

const PTableRow = ({fullName, birthDate, idNum}) => {
    return(<div className='row border-bottom'>
        <div className='col-4'>{fullName}</div>
        <div className='col-4'>{humanDate(birthDate)}</div>
        <div className='col-4'>{idNum}</div>
      </div>)
}

export default PTableRow;