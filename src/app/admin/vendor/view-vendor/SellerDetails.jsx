import React from 'react';

const SellerDetails = () => {
  const seller = {
    personalInfo: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      address: '123, Main Street, Delhi, India'
    },
    bankInfo: {
      bankName: 'HDFC Bank',
      accountNumber: 'XXXX XXXX 1234',
      ifsc: 'HDFC0001234',
      accountType: 'Savings'
    },
    kycInfo: {
      pan: 'ABCDE1234F',
      aadhaar: 'XXXX XXXX 1234',
      status: 'Verified',
      documentsLink: '#'
    },
    shippingInfo: {
      warehouseAddress: '456, Industrial Area, Mumbai',
      courierPartner: 'Delhivery',
      method: 'Express'
    },
    otherInfo: {
      sellerId: 'SELLER123456',
      storeName: 'John\'s Fashion Hub',
      registeredOn: '2024-01-15',
      status: 'Active'
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Seller Details</h2>

      {/* Personal Info */}
      <Card title="Personal Information" bg="primary">
        <p><strong>Full Name:</strong> {seller.personalInfo.name}</p>
        <p><strong>Email:</strong> {seller.personalInfo.email}</p>
        <p><strong>Phone:</strong> {seller.personalInfo.phone}</p>
        <p><strong>Address:</strong> {seller.personalInfo.address}</p>
      </Card>

      {/* Bank Info */}
      <Card title="Bank Information" bg="success">
        <p><strong>Bank Name:</strong> {seller.bankInfo.bankName}</p>
        <p><strong>Account Number:</strong> {seller.bankInfo.accountNumber}</p>
        <p><strong>IFSC Code:</strong> {seller.bankInfo.ifsc}</p>
        <p><strong>Account Type:</strong> {seller.bankInfo.accountType}</p>
      </Card>

      {/* KYC Info */}
      <Card title="KYC Details" bg="warning" textColor="dark">
        <p><strong>PAN Card:</strong> {seller.kycInfo.pan}</p>
        <p><strong>Aadhaar Number:</strong> {seller.kycInfo.aadhaar}</p>
        <p><strong>KYC Status:</strong> {seller.kycInfo.status}</p>
        <p><strong>Documents:</strong> <a href={seller.kycInfo.documentsLink}>View Documents</a></p>
      </Card>

      {/* Shipping Info */}
      <Card title="Shipping Information" bg="info">
        <p><strong>Warehouse Address:</strong> {seller.shippingInfo.warehouseAddress}</p>
        <p><strong>Courier Partner:</strong> {seller.shippingInfo.courierPartner}</p>
        <p><strong>Shipping Method:</strong> {seller.shippingInfo.method}</p>
      </Card>

      {/* Other Info */}
      <Card title="Other Information" bg="secondary">
        <p><strong>Seller ID:</strong> {seller.otherInfo.sellerId}</p>
        <p><strong>Store Name:</strong> {seller.otherInfo.storeName}</p>
        <p><strong>Registration Date:</strong> {seller.otherInfo.registeredOn}</p>
        <p><strong>Status:</strong> {seller.otherInfo.status}</p>
      </Card>
    </div>
  );
};

const Card = ({ title, children, bg = 'light', textColor = 'white' }) => (
  <div className="card mb-4">
    <div className={`card-header bg-${bg} text-${textColor}`}>{title}</div>
    <div className="card-body">{children}</div>
  </div>
);

export default SellerDetails;
