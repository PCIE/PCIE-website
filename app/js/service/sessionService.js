PCIE.service('sessionService', function() {
    var user = window.user;

    return {
        getUser: function() {
            return user;
        },
        setUser: function(newUser) {
            user = newUser;
        },

        getOffresUtilisateur: function() {
            return OffresUtilisateur;
        },

        setOffresUtilisateur: function(data) {
            OffresUtilisateur = data;
        },

        isConnected: function() {
            return !!user;
        }
    };
});