const UserDetails = ({ user }) => {
    if (!user) {
        return null; // Si user est null ou undefined, retourne null pour ne rien afficher
    }
    
    return (
        <div className="user-details">
          <h2>Détails de l'utilisateur</h2>
          <p>Prénom: {user.firstname}</p>
          <p>Nom: {user.lastname}</p>
          <p>Email: {user.email}</p>
          {/* Ajoutez d'autres détails de l'utilisateur au besoin */}
        </div>
    );
}

export default UserDetails