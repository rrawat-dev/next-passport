import passport from '../../middlewares/passport';
import LocalStrategy from 'passport-local';
import middleware from '../../middlewares/middleware';

passport.use(new LocalStrategy.Strategy(
    function(username, password, done) {
        console.log('authenticate ');
        if (username === 'rakesh' && password === 'rawat') {
            done(null, {id: 'xxx'});
        } else {
            done('error', null);
        }
    }
));
  
async function handler(req, res) {
    console.log('API CALLED');

    middleware(req, res).then(({req, res}) => {
        console.log('MIDDLEWARE RAN', req.session);

        passport.authenticate(
            'local',
            (err, result) => {
                console.log('AUTHENTICATION RAN', result);
                req.session = result;
                // Rest of the API logic
                res.json({ message: 'Hello Everyone!' })
            }
        )(req, res);
    });
}
  
export default handler