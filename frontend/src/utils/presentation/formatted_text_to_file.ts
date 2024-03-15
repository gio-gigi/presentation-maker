export const formatted_text_to_file = (formatted_text: string) => {
    const blob = new Blob([formatted_text], { type: 'text/plain' });
    return blob;
}