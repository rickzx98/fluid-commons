import { FluidApi, FluidTable } from '../lib';

import ApiConfig from './ApiConfig';
import InterfaceConfig from './ApiInterface';
import React from 'react';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.specs = [{
			field: 'name',
		}, {
			field: 'company'
		}];
		this.columns = [{ field: 'name', label: 'Name', filter: true },
		{ field: 'company', label: 'Company', filter: true }];
		this.state = {};
	}
	componentWillMount() {
		setTimeout(() => {
			this.setState({
				values
			});
		}, 800);
	}
	render() {
		return (<FluidApi environment="prod" api={InterfaceConfig} config={ApiConfig}>
			<button onClick={() => {
				const exec = FluidApi.execute('addPeople', {});
				exec.then(({ addPeople }) => {
					console.log(addPeople());
				});
			}} type="button">clear</button>

			<FluidTable name="sampleTable" columns={this.columns} value={this.state.values} />
		</FluidApi >);
	}
}

const values = [
	{
		"name": "Prescott",
		"company": "Tellus Sem Mollis Institute"
	},
	{
		"name": "Raphael",
		"company": "Praesent LLP"
	},
	{
		"name": "Colorado",
		"company": "Nunc Interdum Inc."
	},
	{
		"name": "August",
		"company": "Et Commodo Industries"
	},
	{
		"name": "Griffin",
		"company": "A PC"
	},
	{
		"name": "Basil",
		"company": "Non Dapibus Institute"
	},
	{
		"name": "Stephen",
		"company": "A Inc."
	},
	{
		"name": "Keegan",
		"company": "Ut Lacus PC"
	},
	{
		"name": "Alden",
		"company": "Morbi Neque Tellus Corporation"
	},
	{
		"name": "Maxwell",
		"company": "Facilisis Lorem Tristique Company"
	},
	{
		"name": "Allen",
		"company": "Ipsum Sodales Purus Company"
	},
	{
		"name": "Wing",
		"company": "Lorem Lorem Corp."
	},
	{
		"name": "Marsden",
		"company": "Mauris Institute"
	},
	{
		"name": "Mannix",
		"company": "Urna Convallis Erat Industries"
	},
	{
		"name": "Otto",
		"company": "Metus Corp."
	},
	{
		"name": "Reed",
		"company": "Neque Nullam Ltd"
	},
	{
		"name": "Samson",
		"company": "Sed Tortor LLP"
	},
	{
		"name": "Trevor",
		"company": "Fermentum Convallis Ligula Incorporated"
	},
	{
		"name": "Ralph",
		"company": "Tortor Dictum Eu Company"
	},
	{
		"name": "Julian",
		"company": "Ornare Associates"
	},
	{
		"name": "Elliott",
		"company": "Sit Amet Industries"
	},
	{
		"name": "Wang",
		"company": "Nonummy Ut Associates"
	},
	{
		"name": "Eric",
		"company": "Risus Donec PC"
	},
	{
		"name": "Dane",
		"company": "Ante Incorporated"
	},
	{
		"name": "Odysseus",
		"company": "Et Magnis Dis Consulting"
	},
	{
		"name": "Hiram",
		"company": "Velit Cras LLC"
	},
	{
		"name": "Simon",
		"company": "Arcu Sed Ltd"
	},
	{
		"name": "Kenyon",
		"company": "Nonummy Ultricies Ornare Associates"
	},
	{
		"name": "Howard",
		"company": "Vivamus Nisi Mauris Company"
	},
	{
		"name": "Lance",
		"company": "Eu Industries"
	},
	{
		"name": "Alvin",
		"company": "Donec Ltd"
	},
	{
		"name": "Aaron",
		"company": "Aliquam Auctor Velit Associates"
	},
	{
		"name": "Richard",
		"company": "Mauris Integer Consulting"
	},
	{
		"name": "Lyle",
		"company": "Aptent Industries"
	},
	{
		"name": "Talon",
		"company": "Eu Metus In LLP"
	},
	{
		"name": "Jermaine",
		"company": "Metus Facilisis Corporation"
	},
	{
		"name": "Blake",
		"company": "Non Nisi Aenean Corporation"
	},
	{
		"name": "Henry",
		"company": "Aenean Eget Metus Foundation"
	},
	{
		"name": "Melvin",
		"company": "Volutpat Ornare Facilisis Limited"
	},
	{
		"name": "Stewart",
		"company": "Eu Odio LLC"
	},
	{
		"name": "Elton",
		"company": "Sagittis Duis Gravida Limited"
	},
	{
		"name": "Zahir",
		"company": "Nulla Magna Malesuada LLP"
	},
	{
		"name": "Clinton",
		"company": "Dictum Cursus Nunc Ltd"
	},
	{
		"name": "Kennan",
		"company": "Eu Nibh LLC"
	},
	{
		"name": "Fuller",
		"company": "Luctus Et Ultrices Institute"
	},
	{
		"name": "James",
		"company": "Tempus Mauris Consulting"
	},
	{
		"name": "Emmanuel",
		"company": "Et Magnis Dis Associates"
	},
	{
		"name": "Preston",
		"company": "Mauris Quis Turpis LLC"
	},
	{
		"name": "Zephania",
		"company": "Massa Corp."
	},
	{
		"name": "Aquila",
		"company": "Donec Tincidunt Donec Institute"
	},
	{
		"name": "Malachi",
		"company": "At Auctor Corp."
	},
	{
		"name": "Brendan",
		"company": "Arcu Aliquam Associates"
	},
	{
		"name": "Oren",
		"company": "Facilisis Corporation"
	},
	{
		"name": "Hector",
		"company": "Justo LLC"
	},
	{
		"name": "Porter",
		"company": "Et Corp."
	},
	{
		"name": "Linus",
		"company": "Et LLP"
	},
	{
		"name": "Cameron",
		"company": "Neque Sed LLP"
	},
	{
		"name": "Declan",
		"company": "Mollis Lectus LLP"
	},
	{
		"name": "Gareth",
		"company": "Enim Sit Institute"
	},
	{
		"name": "Wyatt",
		"company": "Nullam LLP"
	},
	{
		"name": "Rajah",
		"company": "Aliquet Institute"
	},
	{
		"name": "Quentin",
		"company": "Pede Incorporated"
	},
	{
		"name": "Troy",
		"company": "Ipsum Curabitur Corporation"
	},
	{
		"name": "Octavius",
		"company": "Curabitur LLC"
	},
	{
		"name": "Raja",
		"company": "Pulvinar Arcu Ltd"
	},
	{
		"name": "Hasad",
		"company": "Et Malesuada Corp."
	},
	{
		"name": "Gregory",
		"company": "Orci Limited"
	},
	{
		"name": "Mohammad",
		"company": "Egestas Rhoncus Consulting"
	},
	{
		"name": "Wing",
		"company": "Aliquam Arcu LLP"
	},
	{
		"name": "Michael",
		"company": "Diam Limited"
	},
	{
		"name": "Baker",
		"company": "Aenean Ltd"
	},
	{
		"name": "Abraham",
		"company": "At Company"
	},
	{
		"name": "Malcolm",
		"company": "Fusce Feugiat Corp."
	},
	{
		"name": "Eric",
		"company": "Pharetra Quisque LLC"
	},
	{
		"name": "Alvin",
		"company": "Imperdiet Erat Nonummy Inc."
	},
	{
		"name": "Noah",
		"company": "Pede Nonummy Ltd"
	},
	{
		"name": "Shad",
		"company": "Nam Interdum LLC"
	},
	{
		"name": "Erasmus",
		"company": "Vestibulum Neque Company"
	},
	{
		"name": "Mohammad",
		"company": "Augue Scelerisque Mollis Ltd"
	},
	{
		"name": "Ulysses",
		"company": "Vulputate Industries"
	},
	{
		"name": "Lester",
		"company": "Dolor Egestas Limited"
	},
	{
		"name": "Craig",
		"company": "Erat Associates"
	},
	{
		"name": "Dale",
		"company": "Eget Inc."
	},
	{
		"name": "Jonas",
		"company": "Sociis Incorporated"
	},
	{
		"name": "Cairo",
		"company": "Non Incorporated"
	},
	{
		"name": "James",
		"company": "Natoque Penatibus Et Corporation"
	},
	{
		"name": "Keaton",
		"company": "Erat Vitae Risus PC"
	},
	{
		"name": "Callum",
		"company": "Neque PC"
	},
	{
		"name": "Beck",
		"company": "Eleifend Consulting"
	},
	{
		"name": "Fletcher",
		"company": "Est Mauris Rhoncus LLC"
	},
	{
		"name": "Clinton",
		"company": "Eu Dolor Egestas Consulting"
	},
	{
		"name": "Fritz",
		"company": "Nunc PC"
	},
	{
		"name": "Arthur",
		"company": "Blandit PC"
	},
	{
		"name": "Emery",
		"company": "Magna Consulting"
	},
	{
		"name": "Walker",
		"company": "Convallis In Incorporated"
	},
	{
		"name": "Reece",
		"company": "Arcu Et Pede Corp."
	},
	{
		"name": "Merritt",
		"company": "Lobortis Augue Ltd"
	},
	{
		"name": "Tucker",
		"company": "In Institute"
	},
	{
		"name": "Jacob",
		"company": "Molestie Tortor Industries"
	},
	{
		"name": "Len",
		"company": "Ac Eleifend Corporation"
	}
];