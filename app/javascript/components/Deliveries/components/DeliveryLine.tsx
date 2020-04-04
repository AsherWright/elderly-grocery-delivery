import React from "react";
import {Badge, Row, Col} from "react-bootstrap"

enum OrderStatus {
    Unconfirmed,
    Confirmed,
    Assigned,
    BeingDelivered,
    Completed,
    Cancelled,
    Unknown
}

interface DeliveryLineProps{
    id: string;
    name: string;
    status: OrderStatus;
    amount: number;
    postalCode: string;
}

function getStatusBadge(status: OrderStatus): JSX.Element {
    if (status == OrderStatus.Confirmed){
        return <Badge variant="primary"> Confirmed</Badge>
    }
    else {
        return <Badge variant="primary">Primary</Badge>
    }
    
}
function DeliveryLine(props: DeliveryLineProps): JSX.Element {
    const {id, name, status, amount, postalCode} = props
return <Row> <Col xs={1}> {id}</Col> <Col>{getStatusBadge(status)}</Col> <Col>{name}</Col>  <Col>{amount}</Col> <Col>{postalCode}</Col> </Row>
    //return <Row> Name: {name} {getStatusBadge(status)} Amount: {amount} postalCode: {postalCode} </Row>
}

export default DeliveryLine
