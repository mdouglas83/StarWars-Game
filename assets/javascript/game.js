
function Character(id, name, attack, counter, health, image) {
	this.id = id;
	this.name = name;
	this.attack = attack;
	this.counter = counter;
	this.health = health;
	this.image = image;
}

var char = [];

function initChars() {
	char = [
		new Character(0, "Luke Skywalker", 10, 14, 100, "./assets/images/char0.jpg"),
		new Character(1, "Obi-Wan Kenobi", 8, 12, 120, "./assets/images/char1.jpg"),
		new Character(2, "Darth Sidious", 6, 10, 150, "./assets/images/char2.jpg"),
		new Character(3, "Darth Maul", 4, 8, 180, "./assets/images/char3.jpg")
	];
}

function initPlayers () {
	$("#Player").empty();
	$("#Enemies").empty();
	$("#Attack").empty();
	if (player == null) {
		$("#EnemyHead").empty();
	} else {
		$("#EnemyHead").html("<h2>Enemies Available to Attack</h2>");
	}
	if (attack == null) {
		$("#Fight").empty();
		$("#BtnAttack").hide("fast");
	} else {
		$("#Fight").html('<h2>Fight Section</h2>');
		$("#BtnAttack").show("fast");
	}
	for (i = 0; i < char.length; i++) {
		if (player == null || player === i) {
			$("#Player").append(
				'<div id="' + char[i].id + '" class="CharPlayer">\n' +
				'<p>' + char[i].name + '</p>\n' +
				'<img src="' + char[i].image + '" class="CharImg">\n' +
				'<p>' + char[i].health + '</p>\n' +
				'</div>\n'
			);
		} else if (attack === i) {
			$("#Attack").html(
				'<h2>Defender</h2>\n' +
				'<div id="' + char[i].id + '" class="CharAttack">\n' +
				'<p>' + char[i].name + '</p>\n' +
				'<img src="' + char[i].image + '" class="CharImg">\n' +
				'<p>' + char[i].health + '</p>\n' +
				'</div>\n'
			);
		} else if (char[i].health > 0) {
			$("#Enemies").append(
				'<div id="' + char[i].id + '" class="CharEnemy">\n' +
				'<p>' + char[i].name + '</p>\n' +
				'<img src="' + char[i].image + '" class="CharImg">\n' +
				'<p>' + char[i].health + '</p>\n' +
				'</div>\n'
			);
		}
		$("#" + char[i].id).click(clickPlayers);
	}
}

function clickPlayers() {
	n = parseInt(this.id);
	if (player == null) {
		player = n;
		initPlayers();
	} else if (attack == null) {
		attack = n;
		initPlayers();
	}
}

var player;
var attack;
var round = 0;

$(document).ready(function() {
	initChars();
	initPlayers();
	$("#BtnAttack").click(function() {
		if (!(attack == null)) {
			if (char[player].health > 0) {
				round++;
				var h1 = round * char[player].attack;
				var h2 = char[attack].counter;
				char[attack].health -= h1;
				char[player].health -= h2;
				initPlayers();
				$("#Result").html(
					'<p>You attacked ' + char[attack].name + ' for ' + h1 + ' damage.</p>\n' +
					'<p>' + char[attack].name + ' attacked you back for 24 damage.</p>\n'
				);
				if (char[attack].health <= 0) {
					$("#Result").append('<p><strong>You defeated ' + char[attack].name + '!</strong></p>');
					attack = null;
					var b = false;
					for (i = 0; i < char.length; i++) {
						if (!(i === player)) {
							if (char[i].health > 0) {
								b = true;
							}
						}
					}
					if (b === false) {
						$("#Result").append('<p></p><p><strong>You Won!!!! GAME OVER!!!</strong></p>');
						$("#BtnRestart").show("fast");
					}
				} else if (char[player].health <= 0) {
					$("#Result").append('<p></p><p><strong>You have been defeated... GAME OVER!!!</strong></p>');
					$("#BtnRestart").show("fast");
				}
			} else {
				$("#Result").append('<p></p><p><strong>You have been defeated... GAME OVER!!!</strong></p>');
				$("#BtnRestart").show("fast");
			}
		}
	});

	$("#BtnRestart").click(function() {
		player = null;
		attack = null;
		round = 0;
		initChars();
		$("#Result").empty();
		$("#BtnRestart").hide("fast");
		initPlayers();
	});
});