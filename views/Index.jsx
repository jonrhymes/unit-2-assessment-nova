const React = require('react');

class Index extends React.Component {
    render() {
        console.log(this.props.todos)
        return (
            <html lang="en" dir="ltr">
                <head>
                <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="/public/stylesheets/style.css" rel="stylesheet" /> 
                <title>Unit 2 Assessment</title>
                </head>
                <body>
            <h1>To Do List</h1>
            {/* If there are some to dos, display them, otherwise show this message */}

            {this.props.todos.length > 0 ? null : <h3>There are no To Dos yet!</h3>}
            <ul>
                {this.props.todos.map((todo, i) => {
                    return (
                        <li>
                            {todo.name} - {todo.done ? 'Done' : 'Not Done'}
                            <form action={`/todos/${todo._id}?_method=DELETE`} method="POST">
                            <input type="submit" value="DELETE" />
                            </form>
                        </li>
                    )
                })}
            </ul>
            <hr></hr>
            <form action="/todos" method="POST">
                <input type="text" name="name" />
                <input type="submit" name="" value="ADD TO DO" />
            </form>
                </body>
            </html>
        )
    }
}

module.exports = Index;