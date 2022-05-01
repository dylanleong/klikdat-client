import React from 'react'

const ReadOnlyRow = ({ shoeSize, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td className="col-md-1 align-middle">{shoeSize.shoe_category}</td>
            <td className="col-md-1 align-middle">{shoeSize.shoesize_uk}</td>
            <td className="col-md-1 align-middle">{shoeSize.shoesize_jp}</td>
            <td className="col-md-1 align-middle">{shoeSize.shoesize_us}</td>
            <td className="col-md-1 align-middle">{shoeSize.shoesize_au}</td>
            <td className="col-md-1 align-middle">{shoeSize.shoesize_eu}</td>
            <td className="col-md-1 align-middle">{shoeSize.shoesize_cm}</td>
            <td className="col-md-1 align-middle">{shoeSize.shoesize_in}</td>            
            <td className="col-md-1 align-middle">
                <button type="button" className="btn btn-outline-primary mx-1" onClick={(event)=> handleEditClick(event, shoeSize)}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteClick(shoeSize.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow