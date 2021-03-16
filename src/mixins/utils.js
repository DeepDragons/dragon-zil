const rarity = {
  None: {
    color: '#b0c3d945',
    name: 'None',
    value: 0
  },
  Common: {
    color: '#b0c3d9',
    name: 'Common',
    value: 1
  },
  Uncommon: {
    color: '#5e98d9',
    name: 'Uncommon',
    value: 2
  },
  Rare: {
    color: '#4b69ff',
    name: 'Rare',
    value: 3
  },
  Mythical: {
    color: '#8847ff',
    name: 'Mythical',
    value: 4
  },
  Legendary: {
    color: '#d32ce6',
    name: 'Legendary',
    value: 5
  },
  Immortal: {
    color: '#b28a33',
    name: 'Immortal',
    value: 6
  },
  Arcana: {
    color: '#ade55c',
    name: 'Arcane',
    value: 7
  },
  Ancient: {
    color: '#eb4b4b',
    name: 'Ancient',
    value: 8
  }
};

function getRarity(genschain) {
  // most of visual gens have 2 parts - type (0-9) and color(0-4)
  // head have 1 digit
  // claws have 1 digit
  // Color Scheme have 3 digits
  // MutagenImutable have 3 digits
  // e.g. 777 03 03 43 31 14 33 44 11 73 1 4 110 158
  //      777 01 64 02 94 03 04 40 24 11 4 1 076 065
  // Aura-12   Horns-11   Scales-10   Spots-9   Tail-8   Wings-7
  // Spins-6   Body-5   Eyes-4   Head-3   Claws-2   Color Scheme-1   MutagenImutable-0  
  const rarity_obj = {
    aura: "",
    horns: "",
    scales: "",
    spots: "",
    tail: "",
    wings: "",
    spins: "",
    body: "",
    eyes: "",
    head: ""
  };

  const aura_gen = genschain.substr(3, 1);
  switch (aura_gen) {
    case '0':
      rarity_obj.aura = rarity.None;
      rarity_obj.aura.chance = 40;
      break;
    case '1':
      rarity_obj.aura = rarity.Uncommon;
      rarity_obj.aura.chance = 30;
      break;
    case '2':
      rarity_obj.aura = rarity.Rare;
      rarity_obj.aura.chance = 10;
      break;
    case '3':
      rarity_obj.aura = rarity.Rare;
      rarity_obj.aura.chance = 10;
      break;
    case '4':
      rarity_obj.aura = rarity.Mythical;
      rarity_obj.aura.chance = 5;
      break;
    case '5':
      rarity_obj.aura = rarity.Legendary;
      rarity_obj.aura.chance = 1;
      break;
  }
  rarity_obj.aura.gen = aura_gen;

  const horns_gen = genschain.substr(5, 1);
  switch (horns_gen) {
    case '0':
      rarity_obj.horns = rarity.None;
      rarity_obj.horns.chance = 30;
      break;
    case '1':
      rarity_obj.horns = rarity.Uncommon;
      rarity_obj.horns.chance = 20;
      break;
    case '2':
      rarity_obj.horns = rarity.Rare;
      rarity_obj.horns.chance = 10;
      break;
    case '3':
      rarity_obj.horns = rarity.Rare;
      rarity_obj.horns.chance = 10;
      break;
    case '4':
      rarity_obj.horns = rarity.Rare;
      rarity_obj.horns.chance = 10;
      break;
    case '5':
      rarity_obj.horns = rarity.Rare;
      rarity_obj.horns.chance = 10;
      break;
    case '6':
      rarity_obj.horns = rarity.Mythical;
      rarity_obj.horns.chance = 5;
      break;
    case '7':
      rarity_obj.horns = rarity.Legendary;
      rarity_obj.horns.chance = 1;
      break;
  }
  rarity_obj.horns.gen = aura_gen;

  const scales_gen = genschain.substr(7, 1);
  switch (scales_gen) {
    case '0':
      rarity_obj.scales = rarity.Common;
      rarity_obj.scales.chance = 40;
      break;
    case '1':
      rarity_obj.scales = rarity.Uncommon;
      rarity_obj.scales.chance = 30;
      break;
    case '2':
      rarity_obj.scales = rarity.Rare;
      rarity_obj.scales.chance = 20;
      break;
    case '3':
      rarity_obj.scales = rarity.Mythical;
      rarity_obj.scales.chance = 5;
      break;
    case '4':
      rarity_obj.scales = rarity.Legendary;
      rarity_obj.scales.chance = 1;
      break;
  }
  rarity_obj.scales.gen = scales_gen;

  const spots_gen = genschain.substr(9, 1);
  switch (spots_gen) {
    case '0':
      rarity_obj.spots = rarity.None;
      rarity_obj.spots.chance = 10;
      break;
    case '1':
      rarity_obj.spots = rarity.Common;
      rarity_obj.spots.chance = 20;
      break;
    case '2':
      rarity_obj.spots = rarity.Uncommon;
      rarity_obj.spots.chance = 10;
      break;
    case '3':
      rarity_obj.spots = rarity.Uncommon;
      rarity_obj.spots.chance = 10;
      break;
    case '4':
      rarity_obj.spots = rarity.Uncommon;
      rarity_obj.spots.chance = 10;
      break;
    case '5':
      rarity_obj.spots = rarity.Uncommon;
      rarity_obj.spots.chance = 10;
      break;
    case '6':
      rarity_obj.spots = rarity.Uncommon;
      rarity_obj.spots.chance = 10;
      break;
    case '7':
      rarity_obj.spots = rarity.Uncommon;
      rarity_obj.spots.chance = 10;
      break;
    case '8':
      rarity_obj.spots = rarity.Ancient;
      rarity_obj.spots.chance = 5;
      break;
    case '9':
      rarity_obj.spots = rarity.Legendary;
      rarity_obj.spots.chance = 1;
      break;
  }
  rarity_obj.spots.gen = spots_gen;

  const tail_gen = genschain.substr(11, 1);
  switch (tail_gen) {
    case '0':
      rarity_obj.tail = rarity.None;
      rarity_obj.tail.chance = 30;
      break;
    case '1':
      rarity_obj.tail = rarity.Uncommon;
      rarity_obj.tail.chance = 10;
      break;
    case '2':
      rarity_obj.tail = rarity.Rare;
      rarity_obj.tail.chance = 20;
      break;
    case '3':
      rarity_obj.tail = rarity.Rare;
      rarity_obj.tail.chance = 20;
      break;
    case '4':
      rarity_obj.tail = rarity.Rare;
      rarity_obj.tail.chance = 20;
      break;
    case '5':
      rarity_obj.tail = rarity.Rare;
      rarity_obj.tail.chance = 20;
      break;
    case '6':
      rarity_obj.tail = rarity.Rare;
      rarity_obj.tail.chance = 20;
      break;
    case '7':
      rarity_obj.tail = rarity.Mythical;
      rarity_obj.tail.chance = 5;
      break;
    case '8':
      rarity_obj.tail = rarity.Legendary;
      rarity_obj.tail.chance = 1;
      break;
  }
  rarity_obj.tail.gen = tail_gen;

  const wings_gen = genschain.substr(13, 1);
  switch (wings_gen) {
    case '0':
      rarity_obj.wings = rarity.None;
      rarity_obj.wings.chance = 30;
      break;
    case '1':
      rarity_obj.wings = rarity.Common;
      rarity_obj.wings.chance = 20;
      break;
    case '2':
      rarity_obj.wings = rarity.Uncommon;
      rarity_obj.wings.chance = 15;
      break;
    case '3':
      rarity_obj.wings = rarity.Rare;
      rarity_obj.wings.chance = 10;
      break;
    case '4':
      rarity_obj.wings = rarity.Mythical;
      rarity_obj.wings.chance = 5;
      break;
    case '5':
      rarity_obj.wings = rarity.Legendary;
      rarity_obj.wings.chance = 1;
      break;
  }
  rarity_obj.wings.gen = wings_gen;

  const spins_gen = genschain.substr(15, 1);
  switch (spins_gen) {
    case '0':
      rarity_obj.spins = rarity.Uncommon;
      rarity_obj.spins.chance = 30;
      break;
    case '1':
      rarity_obj.spins = rarity.Rare;
      rarity_obj.spins.chance = 10;
      break;
    case '2':
      rarity_obj.spins = rarity.Common;
      rarity_obj.spins.chance = 20;
      break;
    case '3':
      rarity_obj.spins = rarity.Mythical;
      rarity_obj.spins.chance = 5;
      break;
    case '4':
      rarity_obj.spins = rarity.Legendary;
      rarity_obj.spins.chance = 1;
      break;
  }
  rarity_obj.spins.gen = spins_gen;

  const body_gen = genschain.substr(17, 1);
  switch (body_gen) {
    case '1':
      rarity_obj.body = rarity.Common;
      rarity_obj.body.chance = 90;
      break;
    case '2':
      rarity_obj.body = rarity.Mythical;
      rarity_obj.body.chance = 10;
      break;
    case '3':
      rarity_obj.body = rarity.Immortal;
      rarity_obj.body.chance = 5;
      break;
  }
  rarity_obj.body.gen = body_gen;

  const eyes_gen = genschain.substr(19, 1);
  switch (eyes_gen) {
    case '1':
      rarity_obj.eyes = rarity.Common;
      rarity_obj.eyes.chance = 30;
      break;
    case '2':
      rarity_obj.eyes = rarity.Rare;
      rarity_obj.eyes.chance = 10;
      break;
    case '3':
      rarity_obj.eyes = rarity.Rare;
      rarity_obj.eyes.chance = 10;
      break;
    case '4':
      rarity_obj.eyes = rarity.Rare;
      rarity_obj.eyes.chance = 10;
      break;
    case '5':
      rarity_obj.eyes = rarity.Rare;
      rarity_obj.eyes.chance = 10;
      break;
    case '6':
      rarity_obj.eyes = rarity.Mythical;
      rarity_obj.eyes.chance = 5;
      break;
    case '7':
      rarity_obj.eyes = rarity.Mythical;
      rarity_obj.eyes.chance = 5;
      break;
    case '8':
      rarity_obj.eyes = rarity.Legendary;
      rarity_obj.eyes.chance = 2;
      break;
    case '9':
      rarity_obj.eyes = rarity.Immortal;
      rarity_obj.eyes.chance = 1;
      break;
  }
  rarity_obj.eyes.gen = eyes_gen;

  // Head
  // 1 - 70%
  // 2 - 10%
  // 3 - 10%
  // 4 - 5%
  // 5 - 5%
  const head_gen = genschain.substr(21, 1);
  switch (head_gen) {
    case '1':
      rarity_obj.head = rarity.Common;
      rarity_obj.head.chance = 70;
      break;
    case '2':
      rarity_obj.head = rarity.Rare;
      rarity_obj.head.chance = 15;
      break;
    case '3':
      rarity_obj.head = rarity.Legendary;
      rarity_obj.head.chance = 10;
      break;
    case '4':
      rarity_obj.head = rarity.Immortal;
      rarity_obj.head.chance = 5;
      break;
    case '5':
      rarity_obj.head = rarity.Arcana;
      rarity_obj.head.chance = 1;
      break;
  }
  rarity_obj.head.gen = head_gen;

  return rarity_obj;
}

export default {
  methods: {
    __getRarity(genschain) {
      let color = rarity.Common.color;
      let name = rarity.Common.name;
      const values =  getRarity(genschain);
      const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue.value;
      };
      const rarityLevel = Object.values(values).reduce(reducer, 0);

      if (rarityLevel >= 64) {
        color = rarity.Ancient.color;
        name = rarity.Ancient.name;
      } else if (rarityLevel >= 56) {
        color = rarity.Arcana.color;
        name = rarity.Arcana.name;
      } else if (rarityLevel >= 48) {
        color = rarity.Immortal.color;
        name = rarity.Immortal.name;
      } else if (rarityLevel >= 40) {
        name = rarity.Legendary.name;
        color = rarity.Legendary.color;
      } else if (rarityLevel >= 32) {
        name = rarity.Mythical.name;
        color = rarity.Mythical.color;
      } else if (rarityLevel >= 24) {
        name = rarity.Rare.name;
        color = rarity.Rare.color;
      } else if (rarityLevel >= 16) {
        name = rarity.Uncommon.name;
        color = rarity.Uncommon.color;
      }

      return {
        values,
        name,
        color
      };
    }
  }
};
