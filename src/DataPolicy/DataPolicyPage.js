import React from 'react';
import { Container } from "semantic-ui-react";

const className = "DataPolicyPage";

function DataPolicyPage() {
    return (
        <Container className={className}>
            <h1>Data Policy and Data Deletion Requests</h1>
            <p>Last updated: September 11, 2022</p>

            <h3>Data Deletion Requests</h3>
            <p>To have any of your data deleted, please send an request to admin@survivorpool.win and your request will be processed within 3 business days.</p>

            <p>Any questions about our data retention policy can also be answered by emailing admin@survivorpool.win</p>
        </Container>
    )
}

export default DataPolicyPage;
