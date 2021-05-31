import React, {useState, useEffect} from "react"
import { useParams , navigate} from "@reach/router"
import { Form } from "react-bootstrap";
import { BASE_URL } from "../../config/url";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdArrowBack} from 'react-icons/io'

function AddCash() {

    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("")
    const [receivedBy, setReceivedBy] = useState("")

    const addCash = (e) => {
        const Token = 'bearer' + " " + Cookies.get('Token')
        e.preventDefault()
        axios
            .post(`${BASE_URL}/api/v1/finance/createcashpayment`,{depositAmount: amount, depositType: "cash", receivedDate : date, receivedBy : receivedBy},{ headers : { 'Authorization' : Token }})
            .then(response => {
                console.log(response)
                alert("Cash Deposited")
            })
    } 

    const back = () => {
        navigate("/dashboard/home")
    }

    return(
        <>
        <br />
        <div className="mt-3 row container-fluid justify-content-center">
            <div className="col-12">
            <button className="btn btn-light" style={{backgroundColor : "white"}} onClick={back}><IoMdArrowBack />Back</button>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-8">
                <h4>Cash Deposit</h4>
            </div>
        </div>
        <form>
        <br />
        <div className="row justify-content-center">
            <div className="col-4">
                <label>Deposit Amount</label>
                <input
                type="number"
                class="form-control"
                name="depositAmount"
                id="depositAmount"
                onChange={(e)=>setAmount(e.target.value)}
                />
            </div>
            <div className="col-4">
                <label>Received Date</label>
                <input
                type="date"
                class="form-control"
                name="receivedDate"
                id="receivedDate"
                onChange={(e)=>setDate(e.target.value)}
                />
            </div>
        </div>
        <br />
        <div className="row justify-content-center">
            <div className="col-8">
                <label>Received By</label>
                <input
                type="text"
                class="form-control"
                name="receivedBy"
                id="receivedBy"
                onChange={(e)=>setReceivedBy(e.target.value)}
                />
            </div>
        </div>
        <br />
        <div className="row container-fluid justify-content-center">
            <div className="col-4 text-right">
                <button className="btn btn-secondary btn-user" type="reset"  style={{backgroundColor: "white", color: "black"}}>Reset</button>

            </div>
            <div className="col-4">
                <button className="btn btn-secondary btn-user" onClick={addCash}>Add</button>
                                            
            </div>
        </div>
        </form>
        </>
    )
}

export default AddCash;