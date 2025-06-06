const pizza = (props) => {
    return React.createElement(
        'div',
        {},
        [
        React.createElement('h1', {}, props.name),
        React.createElement('p', {}, props.description),
        ]
    )
}

const App = () => {
    return React.createElement(
        'div',
        {},
        [
        React.createElement('h1', {}, 'Welcome to the Pizza Shop!'),
        React.createElement(pizza, { name: 'Pepperoni', description: 'Spicy and delicious' }),
        React.createElement(pizza, { name: 'Margherita', description: 'Classic and simple' }),
        React.createElement(pizza, { name: 'BBQ Chicken', description: 'Smoky and savory' }),
        React.createElement(pizza, { name: 'Veggie', description: 'Fresh and healthy' }),
        React.createElement(pizza, { name: 'Hawaiian', description: 'Sweet and tangy' }),
        ]
    )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));