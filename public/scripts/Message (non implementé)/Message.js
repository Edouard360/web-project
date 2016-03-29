var Message = React.createClass({
  render: function(){
    return(
      <section className="12u$(xsmall)">
      <Utilisateur {...this.props.emetteur}/>
      Message: {this.props.texte} 
      </section>
      );
  }
});

var ListeMessage = React.createClass({
  render: function(){
    var liste_de_messages = this.props.liste.map(function(props,id){
      return <Message key={id} emetteur={props.emetteur} texte={props.texte} />
    });
    return(
      <section className="12u$(xsmall)">
        {liste_de_messages}
      </section>
      );
  }
});

var BlocMessage = React.createClass({
  getInitialState:function(){
    return {liste_de_messages_emetteur:[],liste_de_messages_destinataire:[]}
  },
  componentDidMount:function(){
    //Call ajax avec un bind this au success
    this.chargerLesMessages();
  },
  chargerLesMessages:function(){
    $.ajax({
      url: "./ChargerLesMessagesDestinataire",
      type: "get",
      dataType: 'json',
      success: function(data) {
        var liste=data.map(function(props){
          var newprops={};
          newprops["emetteur"]={idu:props.idu,nom:props.nom,prenom:props.prenom,identifiant:props.identifiant,admin:props.admin};
          newprops["texte"]=props.texte;
           return newprops;
         });
        this.setState({liste_de_messages_destinataire :liste});
      }.bind(this)
    });
  },
  render: function(){ 
    return(
      <section className="12u$(xsmall)">
      <ListeMessage liste={this.state.liste_de_messages_emetteur} emetteur={true} />
      <ListeMessage liste={this.state.liste_de_messages_destinataire} emetteur={false} />
      </section>
      );
  }
});


