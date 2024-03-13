interface OptionSelectorProps {
    title: string;
    options: string[];
    onSelect?: (option: string) => void;
}
export const OptionSelector = ({ title, options, onSelect }: OptionSelectorProps) => {
    const onSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(onSelect) {
            onSelect(event.target.value);
        }
    }
    return (
        <div className='os-container'>
            <p className='title'>{title}</p>
            <select className='select' onChange={onSelectionChange}>
                {
                    options.map((option, index) => {
                        return <option key={index} value={option}>{option}</option>
                    })
                }  
            </select>
        </div>
    );
}