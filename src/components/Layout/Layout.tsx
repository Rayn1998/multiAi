import { useState, type ReactNode } from "react";

import result_image from "@/assets/images/result_image.jpg";

type Inputs = {
  mode: string;
  referenceImages?: string;
  referenceVideos?: string;
  prompt: string;
  aspect: string;
  duration: string;
  resolution: string;
};

const Layout = ({ children }: { children?: ReactNode }) => {
  const [results, setResults] = useState<Inputs[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="layout">
      <div className="model">
        <div className="main-area">
          <section className="input-block">{children}</section>
          <section className="result-block">
            <div className="result-block-title">
              <p>Your results</p>
              <p>View and manage your generation tasks</p>
            </div>
            <div className="result-block-list">
              {isLoading && <div className="loader"></div>}
              {results &&
                results.map((res, i) => {
                  return (
                    <div key={i} className="result-block-task">
                      <div className="result-block-task-status">Success</div>
                      <p className="result-block-task-prompt">
                        Prompt: {res.prompt}
                      </p>
                      <img
                        className="result-block-task-image-replacer"
                        src={result_image}
                      />
                      <button className="submit-button">Upscale</button>
                    </div>
                  );
                })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Layout;
