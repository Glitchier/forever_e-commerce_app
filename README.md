# Forever - Full-Stack E-commerce Platform

Welcome to **Forever**, a full-featured e-commerce platform built with modern web technologies. This project combines **TypeScript**, **React.js**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB** with **Stripe** and **Razorpay** for payment processing. The platform aims to provide a seamless, responsive, and secure shopping experience.

## Features

- **Product Catalog**: Browse products with dynamic filtering and sorting options.
- **Product Details**: Detailed view with images, descriptions, and pricing.
- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Shopping Cart**: Add, remove, and manage items in the cart.
- **Checkout and Payments**: Integrated with **Stripe** and **Razorpay** for smooth payment processing.
- **Order Management**: Track orders, view summaries, history, and payment statuses.

## Tech Stack

- **Frontend**: 
  - **React.js** and **TypeScript** for robust and scalable UI.
  - **Tailwind CSS** for responsive and customizable design.
  
- **Backend**:
  - **Node.js** and **Express** for API handling.
  - **MongoDB** for efficient database management.

- **Payments**:
  - **Stripe** and **Razorpay** for secure payment processing.

## Getting Started

Follow these steps to set up and run **Forever** locally.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/forever-ecommerce.git
   cd forever-ecommerce

2. **Create a .env file in the root folder and add the following variables**:
  MONGODB_URI=your-mongodb-uri
  STRIPE_SECRET_KEY=your-stripe-secret-key
  RAZORPAY_KEY_ID=your-razorpay-key-id
  RAZORPAY_KEY_SECRET=your-razorpay-key-secret

forever-ecommerce/
├── frontend/           # Frontend code
├── backend/           # Backend code
├── admin/           # Admin page code
├── .env              # Environment variables
└── README.md         # Project documentation


