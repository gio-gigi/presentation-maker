import { usePresentationList } from "../../hooks/usePresentationList";

export const HomePage = () => {
    const { status, presentations } = usePresentationList();
    return (
        <div>
            {
                status.status === 'loading' && <div>Loading...</div>
            }
            {
                status.status === 'error' && <div>Error: {status.message}</div>
            }
            {
                status.status === 'success' && presentations.map(presentation => {
                    return (
                        <div key={presentation.id}>
                            <h1>{presentation.title}</h1>
                            <p>{presentation.description}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}