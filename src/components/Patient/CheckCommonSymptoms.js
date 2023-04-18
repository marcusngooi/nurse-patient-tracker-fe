// COMP308-402 Group Project
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes
//              Grant Macmillan
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Check common symptoms

import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CHECK_SYMPTOMS = gql`
mutation CheckSymptoms(
    $fever: bool!,
    $cough: bool!,
    $fatique: bool!,
    $breathing: bool!,
    $bodyaches: bool! ,
    $headache: bool! ,
    $smell: bool!,
    $sorethroat: bool! ,
    $runnynose: bool! ,
    $vomiting: bool!,
    $diarrhea: bool!,
  )
  {
    checkSymptoms(
        fever: $fever,
        cough :$cough,
        fatique: $fatique,
        breathing:$breathing,
        bodyaches: $bodyaches,
        headache: $headache,
        smell: $smell,
        sorethroat: $sorethroat,
        runnynose: $runnynose,
        vomiting: $vomiting,
        diarrhea:$diarrhea,
    )
      
    {
      _id
    }   		
  }
`;
const CheckSymptoms = (props) => {
    let navigate = useNavigate()
    //
    let fever, cough, fatique, breathing, bodyaches, headache, smell,sorethroat, runnynose, vomiting,diarrhea;
    const [checkSymptoms, { data, loading, error }] = useMutation(CHECK_SYMPTOMS);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

  return (
    <div className = 'entryform'>
    <Form
         onSubmit={ e => {    
            e.preventDefault();
            checkSymptoms( { variables: {fever:fever.value, cough:cough.value, fatique:fatique.value,
                 breathing:breathing.value, bodyaches:bodyaches.value, headache:headache.value,
                  smell:smell.value,sorethroat:sorethroat.value, runnynose:runnynose.value, 
                  vomiting:vomiting.value,diarrhea:diarrhea.value
                 } 
            });
            
            fever.value ='';
            cough.value ='';
            fatique.value ='';
            breathing.value =''; 
            bodyaches.value =''; 
            headache.value ='';
            smell.value ='';
            sorethroat.value ='';
            runnynose.value =''; 
            vomiting.value ='';
            diarrhea.value ='';
            //
            
            
            navigate('/') 
        } 
        }
         >
        <Form.Check name="flexCheck" value="" id="fever" ref={node => {fever = node; }} label="Fever or chills"  />
<Form.Check name="flexCheck" value="" id="cough" ref={node => {cough = node; }} label="Cough" />
<Form.Check name="flexCheck" value="" id="breathing"  ref={node => {breathing = node; }} label="Shortness of breath or difficulty breathing"   />
<Form.Check name="flexCheck" value="" id="fatigue"  ref={node => {fatique = node; }} label="Fatigue"   />
<Form.Check name="flexCheck" value="" id="bodyaches"  ref={node => {bodyaches = node; }} label="Muscle or body aches"   />
<Form.Check name="flexCheck" value="" id="headache"  ref={node => {headache = node; }} label="Headache"   />
<Form.Check name="flexCheck" value="" id="smell"  ref={node => {smell = node; }} label="New loss of taste or smell" />
<Form.Check name="flexCheck" value="" id="sorethroat"  ref={node => {sorethroat = node; }} label="Sore throat" />
<Form.Check name="flexCheck" value="" id="runnynose"  ref={node => {runnynose = node; }} label="Congestion or runny nose" />
<Form.Check name="flexCheck" value="" id="vomiting"  ref={node => {vomiting = node; }} label="Nausea or vomiting" />
<Form.Check name="flexCheck" value="" id="diarrhea"  ref={node => {diarrhea = node; }} label="Diarrhea" />
        <Button className="btn btn-primary btn-large centerButton" type="submit">Send</Button>
     
    </Form>
    </div>
  );

  
};
export default CheckSymptoms;
