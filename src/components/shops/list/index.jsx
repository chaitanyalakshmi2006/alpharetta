import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
const API_KEY = 'QAiN7TWVCOHQ3BDLJT_mh5IjfUzjLzUPLQqQYvRj_9ymXjKTPZc6q1iAlo17X3BYebGvMfNZDfeIE7GPcqZKHqdg1TlANWps83ph8KLOODvNNzFBlYvaykFMNL5FY3Yx';

const ShopsList = () => {
    const [businesses, setBusinesses] = useState([])

    const loadReviewForBusiness = (id) => {
        new Promise((resolve, reject) => {
            try {
                axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`
                    }
                })
                .then((res) => {
                    resolve(res.data.reviews)
                })
                .catch((err) => {
                    console.log ('error',err)
                    resolve([])
                });
            } catch(err) {
                console.log ('error', err)
                resolve([])
            }
        })
    }

    const loadRestaurants = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            },
            params: {
                location: "Alpharetta",
                term: "ice cream",
                categories: "ice cream",
                sort_by: "review_count",
                limit: 5
            }
        })
        .then((res) => {
            console.log("Response is", res)
            res.data.businesses.forEach(element => {
                loadReviewForBusiness(element.id)
                .then((reviewResp) => {
                    element['reviews'] = reviewResp;
                })
                .catch((err) => {
                    element['reviews'] = [];
                })
            });
            setBusinesses(res.data.businesses);
        })
        .catch((err) => {
            console.log ('error')
        });
    }
    useEffect(() => {
        loadRestaurants();
    }, [])
    return(
        <div>
            <Row xs={1} md={4} className="g-4">
                {(businesses?.map((eachBusiness) => (
                    <Col>
                        <Card key={eachBusiness.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={eachBusiness.image_url} width={"100px"} height={"150px"} />
                            <Card.Body>
                            <Card.Title>{eachBusiness.name}</Card.Title>
                            <div>Rating: {eachBusiness.rating}</div><br />
                            <Card.Text>
                                <h6>Address</h6>
                                {(eachBusiness.location.display_address?.map((eachAddress, index) => (
                                    <div key={`${eachBusiness.id}address-${index}`}>
                                        {eachAddress}
                                    </div>
                                )))}
                                <a href={`tel:${eachBusiness.phone}`}>{eachBusiness.display_phone}</a><br /><br />
                                <h6>Review</h6>
                                {(eachBusiness.reviews?.map((eachReview, index) => (
                                    <div key={`${eachBusiness.id}review-${index}`} style={{border: '1px solid', marginBottom: "5px"}}>
                                        {eachReview.user.name} <br />
                                        Given Rating: {eachReview.rating} <br />
                                        {eachReview.text}
                                    </div>
                                )))}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )))}
            </Row>
        </div>
    )
}
export default ShopsList;