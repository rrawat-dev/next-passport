import { useRouter } from 'next/router';
import middleware from '../middlewares/middleware';

function HomePage(props) {
    const router = useRouter();

    if (props.isUserLoggedIn) {
        return <h2>User logged in</h2>;
    }

    return <div>
        <form method="post" action="/api/login">
            <input type="text" name="username"  />
            <input type="text" name="password" />
            <button>submit</button>
        </form>
    </div>
}

export function getServerSideProps(ctx) {
    return middleware(ctx.req, ctx.res).then(({req, res}) => {
        return {
            props: {
                isUserLoggedIn: !!(req.session.id)
            }
        };
    });
}

export default HomePage