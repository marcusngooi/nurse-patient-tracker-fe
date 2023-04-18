import React from 'react'
import { gql, useQuery } from "@apollo/client";



const GET_TIPS = gql`
  {
    tips {
      _id
      message
      patient
    }
  }
`;

const ShowTip = () => {

    const { loading, error, data, refetch } = useQuery(GET_TIPS);


    if (loading) return <p>Loading..</p>
    if (error) return <p>Error :</p>

    return (
        <div>
            <h2>Tips for Patient </h2>
            <ul>
                {data.map((tip) => (
                <li key={tip._id}>
                {tip.message}
                </li>
        ))}
            </ul>
        </div>
    );
}

export default ShowTip