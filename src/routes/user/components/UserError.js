function UserError({ error }) {
  return (
    <div className="user-content">
      <h1>An error has occurred</h1>
      <p>{error}</p>
    </div>
  );
}

export default UserError;
