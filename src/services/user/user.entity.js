const User = require('./user.schema');


module.exports.login = ({ crypto, settings }) => async (req, res) => {
  try {
    
    if (!req.body.email || !req.body.password) return res.status(400).send({ success: false, message: 'Bad request' });
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send({ success: false, message: 'No user found with this email address' });
    const password = crypto.decrypt(user.password);

    if (password != req.body.password.trim()) return res.status(400).send({ success: false, message: 'Incorrect Password' });
    const bearerToken = crypto.encrypt({ _id: user._id, email: user.email, validity: Date.now() + 604800000/*7 days*/ });

    return res.status(200).send({ success: true, message: 'Credential matched', data: { authorization: bearerToken, user: user} })

  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Something went wrong' });

  }
}

module.exports.me = () => async (req, res) => {
  try {
    return res.status(200).send({ success: true, message: 'Authorized', data: req.user })

  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Something went wrong' });

  }
}