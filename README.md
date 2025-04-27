# CarShop - Web Application Project

## Overview
A full-stack web application developed as part of the Web Data Management course. The CarShop platform enables users to browse, purchase, and manage vehicle listings.

## Technologies Used
- Frontend: React
- Backend: Express, Node
- Database: MySQL

## Key Features
- Vehicle listing and management
- User authentication and authorization
- Shopping cart functionality
- Secure payment processing

## Development Period
[Spring 2025] - Web Data Management Course, Masters Program



CREATE TABLE seller(
    seller_email varchar(50) NOT NULL,
    seller_org_name varchar(255) NOT NULL,
    member_since date NOT NULL,
    CONSTRAINT FK_seller FOREIGN key(seller_email) REFERENCES person(email)
);  