import Link from "next/link";
import MyLayout from "../../../components/layout";
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import { set } from "react-hook-form";
import { useTable } from "react-table";
import { nanoid } from "nanoid";
import ReadOnlyRow from './components/ReadOnlyRow'
import EditableRow from './components/EditableRow'


function Table() {
  // load data into shoeSizes container
  const [shoeSizes, setShoeSizes] = useState()

  async function getShoeSizes() {
    const options = {
      url: process.env.API_HOST + 'shoesizes/all',
      method: 'get',
      headers: {
        'Accept': 'application/json',
      }
    }
    // setIsLoading(true);
    const response = await axios(options)
    setShoeSizes(response.data)
    // setIsLoading(false);
  }

  useEffect(() => {
    getShoeSizes();
  }, []);

  // container for details during adding
  const [addFormData, setAddFormData] = useState({
    shoe_category: "",
    shoesize_uk: "",
    shoesize_jp: "",
    shoesize_us: "",
    shoesize_au: "",
    shoesize_eu: "",
    shoesize_cm: "",
    shoesize_in: ""
  })

  // container for details during editing
  const [editFormData, setEditFormData] = useState({
    shoe_category: "",
    shoesize_uk: "",
    shoesize_jp: "",
    shoesize_us: "",
    shoesize_au: "",
    shoesize_eu: "",
    shoesize_cm: "",
    shoesize_in: ""
  })

  // tracks Id being edited
  const [editShoeSizeId, setEditShoeSizeId] = useState(null)

  // populate the addFormData container with changes when they are typed
  const handleAddFormChange = (event) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
  }


  // populate the editFormData container with changes when they are typed
  const handleEditFormChange = (event) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue

    setEditFormData(newFormData)

  }

  // append the shoeSizes container with data from addFormData container
  const handleAddFormSubmit = (event) => {
    event.preventDefault()

    // add new data row into database
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addFormData)
    }
    fetch(process.env.API_HOST + 'shoesizes/', requestOptions)
      .then((response) => response.json())

    // add to the React table
    const newShoeSize = {
      id: nanoid(),
      shoe_category: addFormData.shoe_category,
      shoesize_uk: addFormData.shoesize_uk,
      shoesize_jp: addFormData.shoesize_jp,
      shoesize_us: addFormData.shoesize_us,
      shoesize_au: addFormData.shoesize_au,
      shoesize_eu: addFormData.shoesize_eu,
      shoesize_cm: addFormData.shoesize_cm,
      shoesize_in: addFormData.shoesize_in,
    }

    const newShoeSizes = [...shoeSizes, newShoeSize]
    setShoeSizes(newShoeSizes)
  }

  // locate the Id being edited in shoeSizes container and then update with details from editFormData container
  const handleEditFormSubmit = (event) => {
    event.preventDefault()

    // update data row in database
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData)
    }
    fetch(process.env.API_HOST + 'shoesizes/' + editShoeSizeId, requestOptions)
      .then((response) => response.json())


    const editedShoeSize = {
      id: editShoeSizeId,
      shoe_category: editFormData.shoe_category,
      shoesize_uk: editFormData.shoesize_uk,
      shoesize_jp: editFormData.shoesize_jp,
      shoesize_us: editFormData.shoesize_us,
      shoesize_au: editFormData.shoesize_au,
      shoesize_eu: editFormData.shoesize_eu,
      shoesize_cm: editFormData.shoesize_cm,
      shoesize_in: editFormData.shoesize_in,
    }

    const newShoeSizes = [...shoeSizes]

    const index = shoeSizes.findIndex((shoeSize) => shoeSize.id === editShoeSizeId)

    newShoeSizes[index] = editedShoeSize

    setShoeSizes(newShoeSizes)
    setEditShoeSizeId(null)
  }

  // populate the editFormData container with values that need to be edited
  const handleEditClick = (event, shoeSize) => {
    event.preventDefault()
    setEditShoeSizeId(shoeSize.id)

    const formValues = {
      shoe_category: shoeSize.shoe_category,
      shoesize_uk: shoeSize.shoesize_uk,
      shoesize_jp: shoeSize.shoesize_jp,
      shoesize_us: shoeSize.shoesize_us,
      shoesize_au: shoeSize.shoesize_au,
      shoesize_eu: shoeSize.shoesize_eu,
      shoesize_cm: shoeSize.shoesize_cm,
      shoesize_in: shoeSize.shoesize_in,
    }

    setEditFormData(formValues)
  }

  // reset editShoeSizeId
  const handleCancelClick = () => {
    setEditShoeSizeId(null)
  }

  // locate Id of shoeSize to be deleted and delete it using splice
  const handleDeleteClick = (shoeSizeId) => {
    const newShoeSizes = [...shoeSizes]

    const index = shoeSizes.findIndex((shoeSize) => shoeSize.id === shoeSizeId)

    // delete from database
    const requestOptions = {
      method: 'DELETE'
    }
    fetch(process.env.API_HOST + 'shoesizes/' + shoeSizeId, requestOptions)

    // remove from React table
    newShoeSizes.splice(index, 1)

    setShoeSizes(newShoeSizes)
  }

  // note that this table contains the hidden EditableRow and they interchange depending on whether editShoeSizeId has value or not
  if (shoeSizes === undefined) {
    return <>Still loading...</>
  }
  else {
    return (
      <div>
        <form onSubmit={handleEditFormSubmit}>
          <table className="table table-bordered w-75 table-responsive">
            <thead>
              <tr className="table-primary">
                <th>Shoe Category</th>
                <th>Shoe Size (UK)</th>
                <th>Shoe Size (JP)</th>
                <th>Shoe Size (US)</th>
                <th>Shoe Size (AU)</th>
                <th>Shoe Size (EU)</th>
                <th>Shoe Size (cm)</th>
                <th>Shoe Size (inches)</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {shoeSizes.map((shoeSize) => (
                <Fragment>
                  {editShoeSizeId === shoeSize.id ? (
                    <EditableRow editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />                    
                  ) : (
                    
                      <ReadOnlyRow shoeSize={shoeSize}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}

                      />
                    )}                    
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>

        <h2>Add a Shoe Size</h2>
        <form className="form-inline w-75" onSubmit={handleAddFormSubmit}>
          <div className="row">
            <div className="col"><input type="text" className="form-control" name="shoe_category" required="required" placeholder="Category..." onChange={handleAddFormChange} /></div>
            <div className="col"><input type="text" className="form-control" name="shoesize_uk" required="required" placeholder="UK size..." onChange={handleAddFormChange} /></div>
            <div className="col"><input type="text" className="form-control" name="shoesize_jp" required="required" placeholder="JP size..." onChange={handleAddFormChange} /></div>
            <div className="col"><input type="text" className="form-control" name="shoesize_us" required="required" placeholder="US size..." onChange={handleAddFormChange} /></div>
            <div className="col"><input type="text" className="form-control" name="shoesize_au" required="required" placeholder="AU size..." onChange={handleAddFormChange} /></div>
            <div className="col"><input type="text" className="form-control" name="shoesize_eu" required="required" placeholder="EU size..." onChange={handleAddFormChange} /></div>
            <div className="col"><input type="text" className="form-control" name="shoesize_cm" required="required" placeholder="cm size..." onChange={handleAddFormChange} /></div>
            <div className="col"><input type="text" className="form-control" name="shoesize_in" required="required" placeholder="inches size..." onChange={handleAddFormChange} /></div>
            <div className="col"><button type="submit" className="btn btn-primary">Add</button></div>
          </div>

        </form>
      </div>


    );
  }
}

export default function index() {
  return (<MyLayout><Table /></MyLayout>);
}
