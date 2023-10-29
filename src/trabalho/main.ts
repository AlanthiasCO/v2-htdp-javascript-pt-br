import { Imagem, alturaImagem, carregarImagem, cenaVazia, colocarImagem, espelhar, larguraImagem } from "../../lib/image"
import imgSamurai from "./spites/samurai_padrao.png";
import imgEsqueleto from "./spites/esqueleto.png";
import imgArqueiro from "./spites/arqueiro.png";

const [LARGURA, ALTURA] = [600, 400]
const TELA = cenaVazia(LARGURA, ALTURA)
 
const SAMURAI_DIREITA_INDO = carregarImagem(imgSamurai, 100, 70); // imagem do samurai indo para a direita
const SAMURAI_ESQUERDA_VOLTANDO = espelhar(SAMURAI_DIREITA_INDO); // imagem do samurai indo para a esquerda
const SAMURAI_ALTURA = alturaImagem(SAMURAI_DIREITA_INDO); // obtendo a altura da imagem do samurai
const SAMURAI_LARGURA = larguraImagem(SAMURAI_DIREITA_INDO); // obtendo a largura da imagem do samurai
const Y_INICIAL_SAMURAI = ALTURA / 2; // definindo a posicão Y inicial do samurai
const X_INICIAL_SAMURAI = LARGURA / 2; // definindo a posicão X inicial do samurai
const RAIO_COLISAO_SAMURAI = (SAMURAI_LARGURA + SAMURAI_ALTURA) / 2 / 3; 
const LIMITE_ESQUERDA_SAMURAI = 0 + SAMURAI_LARGURA / 2;
const LIMITE_DIREITA_SAMURAI = LARGURA - SAMURAI_LARGURA / 2;
const LIMITE_INFERIOR_SAMURAI = ALTURA - SAMURAI_ALTURA / 2;
const LIMITE_SUPERIOR_SAMURAI  = 0 + SAMURAI_ALTURA / 2;
const DX_SAMURAI = 3; // velocidade do deslocamento do samurai

const ESQUELETO_DIREITA_INDO = carregarImagem(imgEsqueleto, 100, 70);
const ESQUELETO_ESQUERDA_VOLTANDO = espelhar(imgEsqueleto);
const ESQUELETO_ALTURA = alturaImagem(ESQUELETO_DIREITA_INDO);
const ESQUELETO_LARGURA = larguraImagem(ESQUELETO_DIREITA_INDO);
const RAIO_COLISAO_ESQUELETO = (ESQUELETO_LARGURA + ESQUELETO_ALTURA) / 2 / 3;
const LIMITE_ESQUERDA_ESQUELETO = 0 + ESQUELETO_LARGURA / 2;
const LIMITE_DIREITA_ESQUELETO = LARGURA - ESQUELETO_LARGURA / 2;
const LIMITE_INFERIOR_ESQUELETO = ALTURA - ESQUELETO_ALTURA / 2;
const LIMITE_SUPERIOR_ESQUELETO = 0 + ESQUELETO_ALTURA / 2; 

const ARQUEIRO_DIREITA_INDO = carregarImagem(imgArqueiro, 100, 70);
const ARQUEIRO_ESQUERDA_VOLTANDO = espelhar(imgArqueiro);
const ARQUEIRO_ALTURA = alturaImagem(ARQUEIRO_DIREITA_INDO);
const ARQUEIRO_LARGURA = larguraImagem(ARQUEIRO_DIREITA_INDO);
const RAIO_COLISAO_ARQUEIRO = (ARQUEIRO_LARGURA + ARQUEIRO_ALTURA) / 2 / 3;
const LIMITE_ESQUERDA_ARQUEIRO = 0 + ARQUEIRO_LARGURA / 2;
const LIMITE_DIREITA_ARQUEIRO = LARGURA - ARQUEIRO_LARGURA / 2;
const LIMITE_INFERIOR_ARQUEIRO = ALTURA - ARQUEIRO_ALTURA / 2;
const LIMITE_SUPERIOR_ARQUEIRO = 0 + ARQUEIRO_ALTURA / 2; 


interface Samurai {
    x: number;
    y: number;
    dx: number;
    dy: number;
}
// função responsavel por criar uma instancia do objeto Samurai
function makeSamurai(x: number, y: number, dx: number, dy: number): Samurai {
    return {x, y, dx, dy};
}

interface Esqueleto {
    x: number;
    y: number;
    dx: number;
    dy: number;
}
// função responsavel por criar uma instancia do objeto Esqueleto
function makeArqueiro(x: number, y: number, dx: number, dy: number): Arqueiro {
    return {x, y, dx, dy};
}

interface Arqueiro {
    x: number;
    y: number;
    dx: number;
    dy: number;
}
// função responsavel por criar uma instancia do objeto Arqueiro
function makeEsqueleto(x: number, y: number, dx: number, dy: number): Esqueleto {
    return {x, y, dx, dy};
}

interface Jogo {
    samurai: Samurai;
    esqueletos: Esqueleto[];
    arqueiros: Arqueiro[];
    pontuacao: number;
    gameOver: boolean;
    cont: number;
  }

  function makeJogo(
    samurai: Samurai,
    esqueletos: Esqueleto[],
    arqueiros: Arqueiro[],
    pontuacao: number,
    gameOver: boolean,
    cont: number
  ) {
    return { samurai, esqueletos, arqueiros, pontuacao, gameOver, cont };
  }

  function moveSamurai(samurai: Samurai): Samurai {
    if (samurai.x > LIMITE_DIREITA_SAMURAI) {
      return { ...samurai, x: LIMITE_DIREITA_SAMURAI, dx: -samurai.dx };
    }
    if (samurai.x < LIMITE_ESQUERDA_SAMURAI) {
      return { ...samurai, x: LIMITE_ESQUERDA_SAMURAI, dx: -samurai.dx };
    }
    if (samurai.y > LIMITE_INFERIOR_SAMURAI) {
      return { ...samurai, y: LIMITE_INFERIOR_SAMURAI, dy: -samurai.dy };
    }
    if (samurai.y < LIMITE_SUPERIOR_SAMURAI) {
      return { ...samurai, y: LIMITE_SUPERIOR_SAMURAI, dy: -samurai.dy };
    }
    return { ...samurai, x: samurai.x + samurai.dx, y: samurai.y + samurai.dy };
  }

  function desenhaSamurai(samurai: Samurai): Imagem {
    return colocarImagem(
      samurai.dx < 0 ? SAMURAI_ESQUERDA_VOLTANDO : SAMURAI_DIREITA_INDO,
      samurai.x,
      samurai.y,
      TELA
    );
  }

  function trataTeclaSamurai(samurai: Vaca, tecla: string): Vaca {
    if (tecla === "ArrowRight") {
      return { ...samurai, dx: DX_SAMURAI, dy: 0 };
    }
    if (tecla === "ArrowLeft") {
      return { ...samurai, dx: -DX_SAMURAI, dy: 0 };
    }
    if (tecla === "ArrowDown") {
      return { ...samurai, dx: 0, dy: DX_SAMURAI };
    }
    if (tecla === "ArrowUp") {
      return { ...samurai, dx: 0, dy: -DX_SAMURAI };
    }
    return samurai;
}


// EXEMPLOS DE COMO CRIAR OS OBJETOS
// exemplos de como criar um Samurai
const SAMURAI_INICIAL = makeSamurai(X_INICIAL_SAMURAI, Y_INICIAL_SAMURAI, 0, 0); // foi criado um Samurai que estará no centro da tela
const SAMURAI_INICIAL_ANDANDO = makeSamurai(X_INICIAL_SAMURAI, Y_INICIAL_SAMURAI, DX_SAMURAI, 0); // foi criado um novo samurai, que antes estava no meio da tela, mas agora andou 3 devido ao DX inserido

// exemplos de como criar um Esqueleto



