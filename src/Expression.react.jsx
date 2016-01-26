var React = require('react');

var Expression = React.createClass({
    getInitialState: function () {
        return {
            res: "",
            post: "",
            err: ""
        };
    },

    handleChange: function (event) {
        this.setState({res: event.target.value});
    },
    render: function () {
        return (
            <form id="calculator" name="calc">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <p>{this.state.err}</p>
                            <input type="text" value={this.state.res} onChange={this.handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="buttons">
                            <button value="1" onClick={this.changeText}>1</button>
                            <button value="2" onClick={this.changeText}>2</button>
                            <button value="3" onClick={this.changeText}>3</button>
                            <button value="4" onClick={this.changeText}>4</button>
                            <br></br>
                            <button value="5" onClick={this.changeText}>5</button>
                            <button value="6" onClick={this.changeText}>6</button>
                            <button value="7" onClick={this.changeText}>7</button>
                            <button value="8" onClick={this.changeText}>8</button>
                            <br></br>
                            <button value="9" onClick={this.changeText}>9</button>
                            <button value="0" onClick={this.changeText}>0</button>
                            <button value="+" onClick={this.changeText}>+</button>
                            <button value="-" onClick={this.changeText}>-</button>
                            <br></br>
                            <button value="*" onClick={this.changeText}>*</button>
                            <button value="/" onClick={this.changeText}>/</button>
                            <button value="(" onClick={this.changeText}>(</button>
                            <button value=")" onClick={this.changeText}>)</button>
                            <br></br>
                            <button onClick={this._onChange}>=</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        )


    },
    changeText: function (event) {
        event.preventDefault();
        var self = this;
        self.setState({err: ""});
        self.setState({res: this.state.res.concat(event.target.value)});
    },
    _onChange: function (event) {
        var self = this;
        event.preventDefault();
        var target = this.state.res;
        var xhr = new XMLHttpRequest();
        var url = "http://127.0.0.1/";
        xhr.open("POST", url, true);
        xhr.send(target);
        xhr.onload = function () {
            var post = xhr.responseText;
            if (post.charAt(0) == "Н") {
                self.setState({err: post});
                self.setState({res: ""});
            }
            else {
                self.setState({res: post});
                console.log("Success!")
            }
        };
        xhr.onerror = function () {
            console.log("Error")
        }
    }
});

module.exports = Expression;