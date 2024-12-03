import React, { useState, useEffect } from 'react';
import PermissionsPage from './PermissionsPage';

const PermissionModal = ({ permission, isOpen, onClose, onSave }) => {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (permission) {
      setCode(permission.code);
      setDescription(permission.description);
    }
  }, [permission]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPermission = { code, description };

    if (permission) {
      newPermission.id = permission.id; // For updating an existing permission
    }

    onSave(newPermission); // Call the onSave function passed as prop
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{permission ? 'Edit Permission' : 'Add Permission'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="code">Permission Code</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionModal;
