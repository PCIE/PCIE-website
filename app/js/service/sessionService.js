PCIE.service('sessionService', function() {
    var user = window.user;

    return {
        getUser: function() {
            return user;
        },
        setUser: function(newUser) {
            user = newUser;
        },

        isConnected: function() {
            return !!user;
        }
    };
});