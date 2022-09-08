import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
    uri: `http://localhost:${process.env.REACT_APP_AUTH_PORT}/`
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: { 
            ...headers,
            authorization: localStorage.getItem("token") || ""
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client