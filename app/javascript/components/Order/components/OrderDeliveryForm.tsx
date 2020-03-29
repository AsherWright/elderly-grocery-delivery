import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface OrderDeliveryFormProps {
    onSubmit: () => void;
    orderId: string;
}

interface OrderDeliveryForm {
    firstName: string;
    phoneNumber: string;
    address: string;
    postalCode: string;
    city: string;
    province: string;
    country: string;
    email: string;
    deliveryNotes: string;
}

interface AddressApi {
    name: string;
    address_line: string;
    city: string;
    province: string;
    country: string;
    postal_code: string;
}

interface CreateAddressResponse extends AddressApi {
    id: string;
}

function getTranslation(key: string): string {
    const { t } = useTranslation();

    return t('order_delivery_form.' + key);
}

function getLabelText(fieldTitle: string): string {
    return getTranslation(fieldTitle);
}

function getPlaceholder(fieldTitle: string): string {
    return getTranslation("placeholder_" + fieldTitle)
}

function getFormElement(fieldTitle: string, value: string, onChange: (newVal: string) => void): JSX.Element {
    return (
        <Form.Group>
            <Form.Label>{getLabelText(fieldTitle)}</Form.Label>
            <Form.Control
                placeholder={getPlaceholder(fieldTitle)}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void => onChange(event.target.value)}
            />
        </Form.Group>
    );
}

function submitForm(event: React.FormEvent<HTMLFormElement>, formValues: OrderDeliveryForm, orderId: string, onSubmit: () => void): void {
    event.preventDefault()
    // TODO: add form validation here
    const addressUrl = "/api/v1/addresses/create";
    const ordersUrl = "/api/v1/orders/update"

    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

    const fetchParams = (body: string): RequestInit => {
        return {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body
        }
    }

    const addressBody: AddressApi = {
        name: formValues.firstName,
        address_line: formValues.address,
        postal_code: formValues.postalCode,
        city: formValues.city,
        province: formValues.province,
        country: formValues.country
    }

    fetch(addressUrl, fetchParams(JSON.stringify(addressBody)))
        .then((response: Response) => {
            if (response.ok) {
                return response.json() as Promise<CreateAddressResponse>;
            }
            throw new Error("Network response was not ok on address create.");
        })
        .then((createAddressResponse: CreateAddressResponse) => {
            const addressId = createAddressResponse.id

            const orderBody = {
                status: "confirmed",
                id: orderId,
                destination_id: addressId,
                delivery_notes: formValues.deliveryNotes,
                phone_number: formValues.phoneNumber,
                email: formValues.email,
            }

            fetch(ordersUrl, fetchParams(JSON.stringify(orderBody)))
                .then((response: Response) => {
                    if (response.ok) {
                        console.log("Response was okay. Going to submit")
                        onSubmit()
                        return
                    }
                    throw new Error("Network response was not ok on update orders.");
                })
        })
}

function OrderDeliveryForm(props: OrderDeliveryFormProps): JSX.Element {
    const defaultState = {
        firstName: "",
        phoneNumber: "",
        address: "",
        postalCode: "",
        city: "",
        province: "",
        country: "",
        email: "",
        deliveryNotes: ""
    }

    const [formValues, setFormValues] = useState(defaultState);

    const updateFormValues = (value: Partial<OrderDeliveryForm>): void => {
        setFormValues({
            ...formValues,
            ...value
        });
    };

    return (
        <>
            <Form onSubmit={(event: React.FormEvent<HTMLFormElement>): void => submitForm(event, formValues, props.orderId, props.onSubmit)}>
                {getFormElement('first_name', formValues.firstName, (firstName: string) => updateFormValues({ firstName }))}
                {getFormElement('phone_number', formValues.phoneNumber, (phoneNumber: string) => updateFormValues({ phoneNumber }))}
                {getFormElement('address', formValues.address, (address: string) => updateFormValues({ address }))}
                {getFormElement('postal_code', formValues.postalCode, (postalCode: string) => updateFormValues({ postalCode }))}
                {getFormElement('city', formValues.city, (city: string) => updateFormValues({ city }))}
                {getFormElement('province', formValues.province, (province: string) => updateFormValues({ province }))}
                {getFormElement('country', formValues.country, (country: string) => updateFormValues({ country }))}
                {getFormElement('email', formValues.email, (email: string) => updateFormValues({ email }))}
                {getFormElement('delivery_notes', formValues.deliveryNotes, (deliveryNotes: string) => updateFormValues({ deliveryNotes }))}
                <Button variant="primary" type="submit">
                    {getTranslation('submit')}
                </Button>
            </Form>
        </>
    );
}

export default OrderDeliveryForm;
