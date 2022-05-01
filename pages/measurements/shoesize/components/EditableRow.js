import React from 'react'

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td className="col-md-1"><input type="text" className="form-control" name="shoe_category" required="required" placeholder="Enter a name..." value={editFormData.shoe_category} onChange={handleEditFormChange}/></td>
            <td className="col-md-1"><input type="text" className="form-control" name="shoesize_uk" required="required" placeholder="Enter a shoe size..." value={editFormData.shoesize_uk} onChange={handleEditFormChange}/></td>
            <td className="col-md-1"><input type="text" className="form-control" name="shoesize_jp" required="required" placeholder="Enter a shoe size..." value={editFormData.shoesize_jp} onChange={handleEditFormChange}/></td>
            <td className="col-md-1"><input type="text" className="form-control" name="shoesize_us" required="required" placeholder="Enter a shoe size..." value={editFormData.shoesize_us} onChange={handleEditFormChange}/></td>
            <td className="col-md-1"><input type="text" className="form-control" name="shoesize_au" required="required" placeholder="Enter a shoe size..." value={editFormData.shoesize_au} onChange={handleEditFormChange}/></td>
            <td className="col-md-1"><input type="text" className="form-control" name="shoesize_eu" required="required" placeholder="Enter a shoe size..." value={editFormData.shoesize_eu} onChange={handleEditFormChange}/></td>
            <td className="col-md-1"><input type="text" className="form-control" name="shoesize_cm" required="required" placeholder="Enter a shoe size..." value={editFormData.shoesize_cm} onChange={handleEditFormChange}/></td>
            <td className="col-md-1"><input type="text" className="form-control" name="shoesize_in" required="required" placeholder="Enter a shoe size..." value={editFormData.shoesize_in} onChange={handleEditFormChange}/></td>            
            <td className="col-md-1">
                <button className="btn btn-outline-primary mx-1" type="submit">Save</button>
                <button className="btn btn-outline-primary" onClick={handleCancelClick}>Cancel</button>
            </td>
            
        </tr>
    )
}

export default EditableRow