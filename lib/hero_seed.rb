if Hero.all.count
	Hero.destroy_all
end

Hero.create(name: "Bastion", alpha_id:0, image_path: "bastion", category: "defense")
Hero.create(name: "D.Va", alpha_id:1, image_path: "dva", category: "tank")
Hero.create(name: "Genji", alpha_id:2, image_path: "genji", category: "offense")
Hero.create(name: "Hanzo", alpha_id:3, image_path: "hanzo", category: "defense")
Hero.create(name: "Junkrat", alpha_id:4, image_path: "junkrat", category: "defense")
Hero.create(name: "Lúcio", alpha_id:5, image_path: "lucio", category: "support")
Hero.create(name: "McCree", alpha_id:6, image_path: "mccree", category: "offense")
Hero.create(name: "Mei", alpha_id:7, image_path: "mei", category: "defense")
Hero.create(name: "Mercy", alpha_id:8, image_path: "mercy", category: "support")
Hero.create(name: "Pharah", alpha_id:9, image_path: "pharah", category: "offense")
Hero.create(name: "Reaper", alpha_id:10, image_path: "reaper", category: "offense")
Hero.create(name: "Reinhardt", alpha_id:11, image_path: "reinhardt", category: "tank")
Hero.create(name: "Roadhog", alpha_id:12, image_path: "roadhog", category: "tank")
Hero.create(name: "Soldier: 76", alpha_id:13, image_path: "soldier-76", category: "offense")
Hero.create(name: "Symmetra", alpha_id:14, image_path: "symmetra", category: "support")
Hero.create(name: "Torbjörn", alpha_id:15, image_path: "torbjorn", category: "defense")
Hero.create(name: "Tracer", alpha_id:16, image_path: "tracer", category: "offense")
Hero.create(name: "Widowmaker", alpha_id:17, image_path: "widowmaker", category: "defense")
Hero.create(name: "Winston", alpha_id:18, image_path: "winston", category: "tank")
Hero.create(name: "Zarya", alpha_id:19, image_path: "zarya", category: "tank")
Hero.create(name: "Zenyatta", alpha_id:20, image_path: "zenyatta", category: "support")

Rails.cache.write('ordered_heroes', Hero.order('alpha_id'))