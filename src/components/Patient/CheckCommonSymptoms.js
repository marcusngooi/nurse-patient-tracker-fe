// COMP308-402 Group Project
// Authors:      Marcus Ngooi (301147411)
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
    <form
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
        <Form.Check name="flexCheck" value="" id="fever" label="Fever or chills"  />
        <Form.Check name="flexCheck" value="" id="cough" label="Cough" />
        <Form.Check name="flexCheck" value="" id="breathing"  label="Shortness of breath or difficulty breathing"   />
        <Form.Check name="flexCheck" value="" id="fatigue"  label="Fatigue"   />
        <Form.Check name="flexCheck" value="" id="bodyaches"  label="Muscle or body aches"   />
        <Form.Check name="flexCheck" value="" id="headache"  label="Headache"   />
        <Form.Check name="flexCheck" value="" id="smell"  label="New loss of taste or smell" />
        <Form.Check name="flexCheck" value="" id="sorethroat"  label="Sore throat" />
        <Form.Check name="flexCheck" value="" id="runnynose"  label="Congestion or runny nose" />
        <Form.Check name="flexCheck" value="" id="vomiting"  label="Nausea or vomiting" />
        <Form.Check name="flexCheck" value="" id="diarrhea"  label="Diarrhea" />
        <Button className="btn btn-primary btn-large centerButton" type="submit">Send</Button>
     
    </form>
    </div>
  );

  
};
export default CheckSymptoms;
