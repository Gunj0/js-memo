/* 記法 */
interface INumGenerator {
  generate(): number;
}

// 実装(implements)
class RandomGenerator implements INumGenerator {
  generate(): number {
    return Math.floor(Math.random() * 10);
  }
  // 別のメソッドなどがあってもOK
  generateStr(): string {
    return "Hello";
  }
}
// 実装(implements)
class OneGenerator implements INumGenerator {
  generate(): number {
    return 1;
  }
}

// ポリモーフィズム(多態性)
class Generator {
  play(numGenerator: INumGenerator) {
    const num = numGenerator.generate();
    console.log(`結果！${num}`);
  }
}

/* 出力サンプル */
const generator = new Generator();
const randomGenerator = new RandomGenerator();
const oneGenerator = new OneGenerator();
generator.play(randomGenerator);
generator.play(oneGenerator);
