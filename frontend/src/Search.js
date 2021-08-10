import React, {useState, useEffect} from 'react';
import axios from 'axios' ;

import MemeList from './components/Meme/MemeList' ;

const Search = () => {
    const [Data, SetData] = useState([]);
    const [SearchedData, SetSearchedData] = useState('');
    const [OutputData, SetOutputdData] = useState([]);

    const fetchEmployees = async () => {
        axios.get('http://localhost:8081/employees')
        .then(response => SetData(response.data)) ;
        console.log(Data);    
    };




    useEffect(() => {
        fetchEmployees();
    }, []);

    const SearchHandler = (event) => {
        SetSearchedData(event.target.value) ;
        Data.forEach(function(Item) {
            if(Item.id === SearchedData ||Item.name === SearchedData || Item.salary === SearchedData || Item.gender === SearchedData || Item.team === SearchedData){
                SetOutputdData(OutputData.concat(Item)) ;
            }
            console.log(OutputData);
        });
    }

    return (
        <div>
            <input type = "text" value = {SearchedData} onChange={SearchHandler}>

            </input>
            <MemeList items = {Data}/>
        </div>
    );
}

export default Search ;





































// class Search extends React.Component {
// 	state = {
// 		post: [],
// 		allPosts: []
// 	};

// 	componentDidMount() {
// 		axios
// 			.get(URL, {
// 				headers: {
// 					Accept: "application/json",
// 					"Content-Type": "application/json"
// 				}
// 			})
// 			.then(({ data }) => {
// 				this.setState({
// 					post: data,
// 					allPosts: data // array data from JSON stored in these
// 				});
// 			})
// 			.catch(err => {});
//             // console.log(post) ;
//             // console.log(allPost) ;
// 	}

// 	_onKeyUp = e => {
// 		// filter post list by title using onKeyUp function
//         // console.log(post) ;
//         // console.log(allPost) ;
// 		const post = this.state.allPosts.filter(item =>
// 			item.title.rendered.toLowerCase().includes(e.target.value.toLowerCase())
// 		);
// 		this.setState({ post });
//         console.log(post) ;
// 	};

// 	render() {
// 		return (
// 			<div className="container">
// 				<div className="search-outer">
// 					<form
// 						role="search"
// 						method="get"
// 						id="searchform"
// 						className="searchform"
// 						action=""
// 					>
// 						{/* input field activates onKeyUp function on state change */}
// 						<input
// 							type="search"
// 							onChange={this._onKeyUp}
// 							name="s"
// 							id="s"
// 							placeholder="Search"
// 						/>
// 						<button type="submit" id="searchsubmit">
// 							<i className="fa fa-search" aria-hidden="true" />
// 						</button>
// 					</form>
// 				</div>
// 				<ul className="data-list">
// 					{/* post items mapped in a list linked to onKeyUp function */}
// 					{this.state.post.map((item, index) => (
// 						<li className={"block-" + index}>
// 							<a className="title" href={item.link}>
// 								<h3>{item.title.rendered}</h3>
// 							</a>
// 							<a className="link" href={item.link}>
							 
// 							</a>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 		);
// 	}
// }

// export default Search ;
